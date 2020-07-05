const initialState = {

}

const itemAddDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_ITEM_DATA":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export default itemAddDataReducer
