import authReducer from './isAuth';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    auth: authReducer
})

export default allReducers;