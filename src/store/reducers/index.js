import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { itemsReducer } from './itemsReducer'
import { itemCardDataReducer } from './itemCardDataReducer'
import { propertiesReducer } from './propertiesReducer'

export const allReducers = combineReducers({
		auth: authReducer,
		items: itemsReducer,
		itemInfo: itemCardDataReducer,
		properties: propertiesReducer

})