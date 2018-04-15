import {LOCATION, RESETLOCATION} from '../actions/index';

export default function( state = {lat: null, lng: null, accuracy: null}, action){
    switch(action.type){
        case LOCATION:
            return {lat: action.payload.lat, lng: action.payload.lng , accuracy: action.payload.accuracy};
        case RESETLOCATION:
            return {lat: null, lng: null, accuracy: null};
        default:
            return state 
    }
}