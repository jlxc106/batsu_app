import {USERINFO, SIGNIN, SIGNUP, ERROR, NEWEVENT, SIGNOUT, UPDATEPIC} from '../actions/index';

const DEFAULT_STATE = { profile: {}, events: {}, error: null, logged_in: false };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case UPDATEPIC:
            return {...state, profile:{...state.profile, path: action.payload.path} }
        case USERINFO:
            return {...state, profile: action.payload.profile, events: action.payload.events, error: null, logged_in: true};
        case SIGNIN:
        case SIGNUP:
            return { ...state, logged_in: true};
        case NEWEVENT:
            return{ ...state, events: action.payload.events}
        case ERROR:
            return { ...state, error:action.error };
        case SIGNOUT:
            return { state: DEFAULT_STATE};
        default:
            return state;
    }
}

// state = {
//     profile: {
//         name: 'weeb gang',
//         email: "weebgang@gmail.com",
//         phone: 1234567890,
//         profile_pic: './default_pic.jpg'
//     },
//     events:{
//         createdEvents:[{event_name:"",
//             creator_id: 1,
//              event_id: 57,
//                event_time: 12/30/2018
//           }]
//         invitedEvents:{}
//     }
// }