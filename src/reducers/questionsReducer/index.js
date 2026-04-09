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
      return { ...state, lesson: [...action.payload] };

    case "ADD_COUNT_CORRECT":
      return {
        ...state,
        countCorrect: {
          ...state.countCorrect,
          [action.payload]: (state.countCorrect[action.payload] || 0) + 1,
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
