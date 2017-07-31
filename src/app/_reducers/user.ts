import { ActionReducer, Action } from '@ngrx/store';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export default function currentUser(state = null, action: Action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return action.payload;
		default:
			return state;
	}
}