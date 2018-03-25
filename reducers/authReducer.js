import { 
	FACEBOOK_LOGIN_SUCCESS, 
	FACEBOOK_LOGIN_FAIL,
	GOOGLE_LOGIN_SUCCESS,
	GOOGLE_LOGIN_FAIL,
	LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
	token: '',
	expires: '',
	type: ''
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case FACEBOOK_LOGIN_SUCCESS:
			return { ...state, token: action.payload.token };
		case FACEBOOK_LOGIN_FAIL:
			return { ...state, token: null };
		case GOOGLE_LOGIN_SUCCESS:
			return { ...state, token: action.payload.token, type: action.payload.type };
		case GOOGLE_LOGIN_FAIL:
			return { ...state, token: null }
		case LOGOUT_USER: 
			return { ...state, token: '', expires: '', type: '' }
		default:
			return state;
	}
}