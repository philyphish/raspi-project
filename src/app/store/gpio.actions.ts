import { Action } from '@ngrx/store';

export const SEND_MESSAGE = 'SEND_MESSAGE';

export class SendMessage implements Action {
    readonly type = SEND_MESSAGE;
    
    constructor(public payload: string){}
}