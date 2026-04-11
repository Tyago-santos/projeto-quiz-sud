export const initialStateQuestion = {
  categorySelect: [],
  lesson: [],
  countCorrect: {},
  countError: 0,
};

export const questionReducer = (state = initialStateQuestion, action) => {
  switch (action.type) {
    case "ADD_QUESTION_SELECT":
      return {
        ...state,
        categorySelect: [...state.categorySelect, action.payload],
      };

    case "REMOVE_QUESTION_SELECT":
      const newState = state.categorySelect.filter(
        (item) => item !== action.payload,
      );
      return { ...state, categorySelect: [...newState] };

    case "ADD_LESSON":
      const novaLesson = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
      return { ...state, lesson: [...novaLesson] };

    case "ADD_COUNT_CORRECT":
      // Ignora payload inválido
      if (!action.payload) return state;
      // Garante que countCorrect seja sempre um objeto (evita estado antigo numérico)
      const safeCountCorrect =
        state && typeof state.countCorrect === "object" && state.countCorrect !== null
          ? state.countCorrect
          : {};
      return {
        ...state,
        countCorrect: {
          ...safeCountCorrect,
          [action.payload]: (safeCountCorrect[action.payload] || 0) + 1,
        },
      };

    case "ADD_COUNT_ERROR":
      return { ...state, countError: action.payload + 1 };

    case "ADD_COUNT_RESERT":
      return { ...state, countError: 0, countCorrect: {} };
    default:
      return state;
  }
};
