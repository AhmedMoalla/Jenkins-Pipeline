import io from 'socket.io-client';
import { ActionReducer, Action } from '@ngrx/store';

export const INIT_SOCKET = 'INIT_SOCKET';

export default function socketReducer(state = null, action: Action) {
	switch (action.type) {
		case INIT_SOCKET:
			return connectToSocketIO();
		default:
			return state;
	}
}

function connectToSocketIO() {
    return io("http://localhost:3000");
}