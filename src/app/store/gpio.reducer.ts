import { Action } from '@ngrx/store';
import * as WebSocketAction from './gpio.actions';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as env from '../../environments/environment';

const initialState = {
    message: 'off'
};
let wsRaspi: WebSocketSubject<any>;

export function messageReducer(state = initialState, action: WebSocketAction.WebSocketActions) {

    switch(action.type) {
        case WebSocketAction.GET_CONNECTED: 
            wsRaspi = webSocket(env.environment.wsServer);

        case WebSocketAction.SEND_MESSAGE:
            wsRaspi.next({ message: action.payload });
            wsRaspi.asObservable().subscribe(res => console.log('From Store: ', res)
            );
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

