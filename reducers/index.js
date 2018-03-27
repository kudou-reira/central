import { combineReducers } from 'redux';
import authReducer from './authReducer';
import jobsReducer from './jobsReducer';
import likesReducer from './likesReducer';
import alarmsReducer from './alarmsReducer';

export default({
	auth: authReducer,
	jobs: jobsReducer,
	likes: likesReducer,
	alarms: alarmsReducer
});