import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { lib } = await req.json();

    if (!lib || (Array.isArray(lib) && lib.length === 0)) {
      return NextResponse.json(
        { error: "Nenhuma categoria enviada" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key ausente" }, { status: 500 });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const topics = Array.isArray(lib) ? lib : [lib];
    const allQuestions = [];

    // pequena função de retry para lidar com 503/429 transitórios
    const callGemini = async (requestBody, attempt = 1) => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      // retry para 429/503 até 3 tentativas com backoff simples
      if (!response.ok && attempt < 3 && [429, 503].includes(response.status)) {
        const retryAfter = 1500 * attempt; // 1.5s, 3s
        await new Promise((res) => setTimeout(res, retryAfter));
        return callGemini(requestBody, attempt + 1);
      }

      return response;
    };

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Atue como um gerador de quizzes especializado. Gere 20 perguntas de múltipla escolha. Essa perguntas devem ser aleatórias e variadas, mas todas relacionadas ao seguinte TEMA(S) PRINCIPAL (IS): ${topic}.


REGRA DE TEMA CONDICIONAL:
- Se o tema fornecido acima for "outro" (ou vazio/indefinido), ignore o valor original e gere perguntas sobre: "Curiosidades e História da Igreja de Jesus Cristo dos Santos dos Últimos Dias".
- Foque em temas como:  Pioneiros, Templos, Restauração e Profetas Modernos.
- preserve o tema como "${topic}", não mude.

REGRAS DE FORMATO (CRÍTICO):
1. Retorne APENAS o JSON. Não escreva "Aqui está o seu quiz" ou qualquer outro texto.
2. Formato exato (Array de Objetos):
[
  {
    "id": 1,
    "question": "Texto da pergunta",
    "tema": "A Igreja de Jesus Cristo",
    "response": [
      { "options": "Opção 1", "isCorrect": false },
      { "options": "Opção 2", "isCorrect": true },
      { "options": "Opção 3", "isCorrect": false },
      { "options": "Opção 4", "isCorrect": false }
    ]
  }
]

REGRAS DE CONTEÚDO E ALEATORIEDADE:
- ALEATORIEDADE TOTAL: A opção correta ("isCorrect": true) DEVE mudar de posição em cada pergunta (não deixe sempre na primeira ou na mesma posição).
- Certifique-se de que cada pergunta tenha exatamente 4 opções e apenas UMA esteja correta.
- O JSON deve ser perfeitamente válido para evitar erros de leitura no código.
`,
              },
            ],
          },
        ],
        generationConfig: {
          response_mime_type: "application/json",
        },
      };

      const response = await callGemini(requestBody);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini error", response.status, errorText);
        return NextResponse.json(
          { error: "Falha ao chamar Gemini", detail: errorText },
          { status: response.status },
        );
      }

      const data = await response.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!raw) {
        return NextResponse.json(
          { error: "Resposta inesperada do Gemini" },
          { status: 502 },
        );
      }

      const questions = JSON.parse(raw);

      const adjustedQuestions = questions.map((q, idx) => ({
        ...q,
        id: allQuestions.length + idx + 1,
      }));

      allQuestions.push(...adjustedQuestions);
    }

    return NextResponse.json(allQuestions);
  } catch (err) {
    console.error("API /api/gemini error", err);
    return NextResponse.json(
      { error: "Erro interno", detail: err.message },
      { status: 500 },
    );
  }
}
