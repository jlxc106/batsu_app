import {LOCATION} from '../actions/index';

export default function( state = {lat: null, long: null, accuracy: null}, action){
    switch(action.type){
        case LOCATION:
            return {lat: action.payload.lat, long: action.payload.lng , accuracy: action.payload.accuracy}
        default:
            return state 
    }
}