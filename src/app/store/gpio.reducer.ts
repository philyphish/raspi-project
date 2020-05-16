import { Action } from '@ngrx/store';
import * as SendMessage from './gpio.actions';

const initialState = {
    message: 'off'
};

export function messageReducer(state = initialState, action: SendMessage.SendMessage) {

    switch(action.type) {
        case SendMessage.SEND_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

