import {
	UPDATE_ALARMS
} from '../actions/types';

const INITIAL_STATE = {
	alarms: []
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case UPDATE_ALARMS:
			return { ...state, alarms: [...state.alarms, action.payload ] };
		default:
			return state;
	}
}