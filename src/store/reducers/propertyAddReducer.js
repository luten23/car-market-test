const initialState = { }

const PropertyAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_PROPERTY":
      return { ...state, propertyAdd: action.payload };
    default:
      return state;
  }
}

export default PropertyAddReducer
