import { ActionReducer, Action } from '@ngrx/store';

export const SET_CURRENT_URL = 'SET_CURRENT_URL';

export default function currentUrl(state = null, action: Action) {
	switch (action.type) {
		case SET_CURRENT_URL:
			return action.payload;
		default:
			return state;
	}
}