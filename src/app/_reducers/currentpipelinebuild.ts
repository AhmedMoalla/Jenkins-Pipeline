import { ActionReducer, Action } from '@ngrx/store';

export const SET_CURRENT_PIPELINE_BUILD = 'SET_CURRENT_PIPELINE_BUILD';

export default function currentPipelineBuild(state = null, action: Action) {
	switch (action.type) {
		case SET_CURRENT_PIPELINE_BUILD:
			return action.payload;
		default:
			return state;
	}
}