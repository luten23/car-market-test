const initialState = {
  properties: []
}

const propertiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PROPERTIES":
      return { ...state, properties: action.payload };
    default:
      return state;
  }
}

export default propertiesReducer
