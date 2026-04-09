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
                text: `Gere 10 perguntas estruturadas sobre o tema: ${topic}. Retorne em JSON com este formato:
[
  {
    id: 1,
    question: "",
    tema: "${topic}",
    response: [
      { options: "", isCorrect: true },
      { options: "", isCorrect: false },
      { options: "", isCorrect: false },
      { options: "", isCorrect: false }
    ]
  }
]`,
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
