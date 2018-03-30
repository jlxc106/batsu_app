import {LOCATION} from '../actions/index';

export default function( state = {}, action){
    switch(action.type){
        case LOCATION:
            // console.log("location action: ", action);
            return {lat: action.payload.latitude, long: action.payload.longitude }
        default:
            return state 
    }
}