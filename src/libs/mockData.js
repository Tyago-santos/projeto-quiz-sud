// Mock data for testing the quiz functionality
export const mockQuestions = [
  {
    id: 1,
    question: "Qual é a capital do Brasil?",
    tema: "Geografia",
    response: [
      { options: "Brasília", isCorrect: true },
      { options: "Rio de Janeiro", isCorrect: false },
      { options: "São Paulo", isCorrect: false },
      { options: "Salvador", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "Quanto é 2 + 2?",
    tema: "Matemática",
    response: [
      { options: "4", isCorrect: true },
      { options: "3", isCorrect: false },
      { options: "5", isCorrect: false },
      { options: "22", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "Qual é o maior planeta do sistema solar?",
    tema: "Astronomia",
    response: [
      { options: "Júpiter", isCorrect: true },
      { options: "Saturno", isCorrect: false },
      { options: "Terra", isCorrect: false },
      { options: "Marte", isCorrect: false },
    ],
  },
  {
    id: 4,
    question: "Quem escreveu 'Dom Quixote'?",
    tema: "Literatura",
    response: [
      { options: "Miguel de Cervantes", isCorrect: true },
      { options: "William Shakespeare", isCorrect: false },
      { options: "Machado de Assis", isCorrect: false },
      { options: "Jorge Luis Borges", isCorrect: false },
    ],
  },
  {
    id: 5,
    question: "Qual é o símbolo químico do ouro?",
    tema: "Química",
    response: [
      { options: "Au", isCorrect: true },
      { options: "Ag", isCorrect: false },
      { options: "Fe", isCorrect: false },
      { options: "Cu", isCorrect: false },
    ],
  },
];

// Mock categories for selection
export const mockCategories = [
  "Geografia",
  "Matemática",
  "Astronomia",
  "Literatura",
  "Química",
];

// Initial state for testing
export const mockInitialState = {
  categorySelect: [],
  lesson: [],
  countCorrect: 0,
  countError: 0,
};
