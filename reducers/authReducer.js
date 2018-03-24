import { 
	FACEBOOK_LOGIN_SUCCESS, 
	FACEBOOK_LOGIN_FAIL,
	GOOGLE_LOGIN_SUCCESS,
	GOOGLE_LOGIN_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	token: '',
	expires: '',
	type: ''
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case FACEBOOK_LOGIN_SUCCESS:
			return { ...state, token: action.payload.token, expires: action.payload.expires, type: action.payload.type };
		case FACEBOOK_LOGIN_FAIL:
			return { ...state, token: null, expires: null, type: null };
		case GOOGLE_LOGIN_SUCCESS:
			return { ...state, token: action.payload.token, expires: action.payload.expires, type: action.payload.type };
		case GOOGLE_LOGIN_FAIL:
			return { ...state, token: null, type: null }
		default:
			return state;
	}
}