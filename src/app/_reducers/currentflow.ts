import { ActionReducer, Action } from '@ngrx/store';
import { Flow } from '../flow';

export const SET_CURRENT_FLOW = 'SET_CURRENT_FLOW';

export default function currentFlow(state: Flow = null, action: Action) : Flow {
	switch (action.type) {
		case SET_CURRENT_FLOW:
			return action.payload;
		default:
			return state;
	}
}