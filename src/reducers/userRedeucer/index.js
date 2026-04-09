export const initialStateUser = {
  name: "",
  email: "",
  userId: "",
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload.name };
    case "SET_EMAIL":
      return { ...state, email: action.payload.email };
    case "SET_USER_ID":
      return { ...state, userId: action.payload.userId };

    default:
      return state;
  }
};
