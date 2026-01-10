import { NextResponse } from 'next/server';


 


export async function POST(req) {

  const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "integer" },
      question: { type: "string" },
      tema: { 
        type: "object", 
        items: { 
          type: "string", 
          enum: ["velho testamento", "livro de mórmon", "outros", "novo testamento", "perola de grande valor"] 
        } 
      },
      response: {
        type: "array",
        items: {
          type: "array",
          properties: {
            options: { type: "string" },
            isCorrect: { type: "boolean" }
          },
          required: ["options", "isCorrect"]
        }
      }
    },
    required: ["id", "question", "tema", "response"]
  }
};

const schemaString = JSON.stringify(schema);

 [
  {
    id: 1,
    question: "",
    tema: "",
    response: [
      { options: "", isCorrect: Boolean },
      { options: "", isCorrect: Boolean },
      { options: "", isCorrect: Boolean },
      { options: "", isCorrect: Boolean }
    ]
  }]


  // 1. Pega o dado que veio do formulário
  const { lib} = await req.json();

  const apiKey = process.env.GOOGLE_APY_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{
      parts: [{ 
        // 2. Insere o dado no prompt dinamicamente
        text:  `Gere 10  perguntas estruturada sobre o tema 
 [
  {
    id: 1,
    question: "",
    tema: "",
    response: [
      { options: "", isCorrect: Boolean },
      { options: "", isCorrect: Boolean },
      { options: "", isCorrect: Boolean },
      { options: "", isCorrect: Boolean }
    ]
  }] `+ lib, 
      }]
    }],
    generationConfig: {
      response_mime_type: "application/json",
      // response_schema: schemaString
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  const aiText = JSON.parse(data.candidates[0].content.parts[0].text);

  return NextResponse.json(aiText);
}