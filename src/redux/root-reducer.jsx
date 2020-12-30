import userReducer from '../redux/user/user.reducer';

import {combineReducers} from 'redux'

export default combineReducers({
    user: userReducer
})