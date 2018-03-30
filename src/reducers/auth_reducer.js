import {SIGNIN, SIGNUP, ERROR} from '../actions/index';

const DEFAULT_STATE = { authorized: false, error: null, msg: '' };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case SIGNIN:
        case SIGNUP:
            return { ...state, authorized: true, error: null };
        case ERROR:
            return { ...state, error:action.error };
        default:
            return state;
    }
}