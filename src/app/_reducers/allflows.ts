import { ActionReducer, Action } from '@ngrx/store';
import { Flow } from '../flow';

export const GET_ALL_FLOWS = 'GET_ALL_FLOWS';

export default function flowsReducer(state: Flow[] = [], action: Action) : Flow[] {
	switch (action.type) {
		case GET_ALL_FLOWS:
			return action.payload;
		default:
			return state;
	}
}