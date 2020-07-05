import Cookies from "js-cookie"

const initialState = {
  isAuth: !!Cookies.get("vasya")
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}

export default authReducer
