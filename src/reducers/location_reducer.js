import {LOCATION, RESETLOCATION} from '../actions/index';

export default function( state = {lat: null, lng: null, accuracy: null, showPermissionMsg: false}, action){
    switch(action.type){
        case LOCATION:
            return {lat: action.payload.lat, lng: action.payload.lng , accuracy: action.payload.accuracy, showPermissionMsg: action.payload.showPermissionMsg};
        case RESETLOCATION:
            return {lat: null, lng: null, accuracy: null, showPermissionMsg: false};
        default:
            return state 
    }
}