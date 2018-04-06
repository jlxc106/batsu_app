import {LOCATION} from '../actions/index';

export default function( state = {}, action){
    switch(action.type){
        case LOCATION:
            console.log("action", action);
            return {lat: action.payload.location.lat, long: action.payload.location.lng }
        default:
            return state 
    }
}