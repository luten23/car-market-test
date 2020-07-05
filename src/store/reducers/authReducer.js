const initialState = {
  isAuth: !!localStorage.getItem("authorization_token")
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}