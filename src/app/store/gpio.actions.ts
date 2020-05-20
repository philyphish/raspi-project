import { Action } from '@ngrx/store';

export const GET_CONNECTED = 'GET_CONNECTED';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export class SendMessage implements Action {
    readonly type = SEND_MESSAGE;
    
    constructor(public payload: string){}
}

export class GetConnected implements Action {
    readonly type = GET_CONNECTED;

    constructor(public payload: string){}
}

export type WebSocketActions = GetConnected | SendMessage;