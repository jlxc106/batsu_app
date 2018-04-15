import {USERINFO, SIGNIN, SIGNUP, ERROR, NEWEVENT, SIGNOUT, UPDATEPIC, CLEARERRORS} from '../actions/index';

const DEFAULT_STATE = { profile: {}, events: {}, error: [], logged_in: false };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case UPDATEPIC:
            return {...state, profile:{...state.profile, path: action.payload.path} }
        case USERINFO:
            return {...state, profile: action.payload.profile, events: action.payload.events, error: [], logged_in: true};
        case SIGNIN:
        case SIGNUP:
            return {...state, logged_in: true};
        case NEWEVENT:
            return{...state, events: {...state.events, createdEvents: [...state.events.createdEvents, action.payload ]}} //action.payload.events
        case ERROR:
            return {...state, error:action.payload };
        case CLEARERRORS:
            return {...state, error: []};
        case SIGNOUT:
            return DEFAULT_STATE;
        default:
            return state;
    }
}