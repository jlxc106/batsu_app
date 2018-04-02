import {LOCATION} from '../actions/index';

export default function( state = {}, action){
    switch(action.type){
        case LOCATION:
            return {lat: action.payload.latitude, long: action.payload.longitude }
        default:
            return state 
    }
}