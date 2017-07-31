import { ActionReducer, Action } from '@ngrx/store';
import { Stats } from '../stats';

export const SET_CURRENT_STATS = 'SET_CURRENT_STATS';

export default function currentFlowStats(state: Stats = null, action: Action) : Stats {
	switch (action.type) {
		case SET_CURRENT_STATS:
			return action.payload;
		default:
			return state;
	}
}