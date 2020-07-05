const initialState = {
	itemInfo: {
		name: '',
		price: null,
		date: '',
		description: '',
		id: null
	}
}

const itemCardDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ITEM_CARD_DATA':
			return { ...state, itemInfo: action.payload };
		case 'DATA_SET_DEFAULT':
			return initialState
		default:
			return state;
	}
}

export default itemCardDataReducer
