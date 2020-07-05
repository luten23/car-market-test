const initialState = {
  items: []
}

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_ITEMS":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}