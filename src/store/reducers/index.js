import authReducer from './isAuth'
import itemsReducer from './itemsReducer'
import itemCardDataReducer from './itemCardDataReducer'
import itemEditDataReducer from './itemEditDataReducer'
import itemAddDataReducer from './itemAddDataReducer'
import propertiesReducer from './propertiesReducer'
import propertyAddReducer from './propertyAddReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
		auth: authReducer,
		items: itemsReducer,
		itemInfo: itemCardDataReducer,
		itemEdit: itemEditDataReducer,
		itemAdd: itemAddDataReducer,
		properties: propertiesReducer,
		propertyAdd: propertyAddReducer
})

export default allReducers;