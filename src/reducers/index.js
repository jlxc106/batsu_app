import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userInfoReducer from './auth_reducer';
import locationReducer from './location_reducer'

export default combineReducers({
    userInfo: userInfoReducer,
    form: formReducer,
    userLocation: locationReducer
});