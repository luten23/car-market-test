const initialState = {

}

const itemEditDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUT_ITEM_DATA":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export default itemEditDataReducer
