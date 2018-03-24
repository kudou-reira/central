import { combineReducers } from 'redux';
import authReducer from './authReducer';
import jobsReducer from './jobsReducer';
import likesReducer from './likesReducer';

export default({
	auth: authReducer,
	jobs: jobsReducer,
	likes: likesReducer
});