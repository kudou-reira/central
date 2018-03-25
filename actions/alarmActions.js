import {
	UPDATE_ALARMS
} from './types'

export const updateAlarms = (alarm) => {
	return(
		type: UPDATE_ALARMS,
		payload: alarm
	);
}