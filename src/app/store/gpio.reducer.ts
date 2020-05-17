import { Action } from '@ngrx/store';
import * as SendMessage from './gpio.actions';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as env from '../../environments/environment';

const initialState = {
    message: 'off'
};
let wsRaspi: WebSocketSubject<any>;

wsRaspi = webSocket(env.environment.wsServer);
export function messageReducer(state = initialState, action: SendMessage.SendMessage) {

    switch(action.type) {
        case SendMessage.SEND_MESSAGE:
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

