import axios from 'axios';

const BASE_URL = 'http://jayclim.com/php/form.php';

export const SIGNUP = 'signup';
export const ERROR = 'error';
export const SIGNIN = 'signin';
export const LOCATION = 'location';
export const USERINFO = 'userinfo';
export const NEWEVENT = 'newevent';
export const SIGNOUT = 'signout';
export const UPDATEPIC = 'updateprofilepic';


export function getSignIn({email, password}, history){
    return dispatch => {
        axios.post(`${BASE_URL}?operation=signin`, {email, password}).then((resp) => {
            console.log("Sign In resp:", resp);
            if(resp.data.success === true){
                var now = new Date();
                var time = now.getTime();
                var expireTime = time + 86400000;   //token expires in 24 hours
                now.setTime(expireTime);
                document.cookie = "token="+resp.data.token+";expires="+now.toUTCString()+";path=/";
                history.push('/home');
                dispatch({
                    type: SIGNIN,
                    payload: resp
                });
            }
            else{
                let message = "";
                resp.data.errors.map(function(error_msg){
                    message += error_msg + ". ";
                })
                throw new Error(message);
            }
        }).catch(error => {
            dispatch(sendError(error.message));
        });
    };
};

export function getSignUp({fname, lname, phone, email, password, password_conf, dob}, history){
    return (dispatch) => {
        axios.post(`${BASE_URL}?operation=insertUser`, {fname, lname, phone, email, password, password_conf, dob}).then((resp) => {
            console.log("Sign Up resp", resp);
            if(resp.data.success === true){
                var now = new Date();
                var time = now.getTime();
                var expireTime = time + 86400000;   //24 hours
                now.setTime(expireTime);
                document.cookie = "token="+resp.data.token+";expires="+now.toUTCString()+";path=/";
                history.push('/home');
                dispatch({
                    type: SIGNUP,
                    payload: resp
                }); 
            }
            else{
                let message = "";
                resp.data.errors.map(function(error_msg){
                    message += error_msg + ". ";
                })
                throw new Error(message);
            }
        }).catch((error) => {
            dispatch(sendError(error.message));
        });
    };
};

export function getSignOut(){
    return{
        type: SIGNOUT
    }
}


export function storeLocation(){
    return(dispatch)=>{
        axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB4Ob07sNsJpQo-x5N4d0xjTB99lx15xCc").then((resp)=>{
            if(resp.status == 200){
                dispatch({
                    type: LOCATION,
                    payload: {
                        lat:resp.data.location.lat,
                        lng:resp.data.location.lng,
                        accuracy:resp.data.accuracy
                    }
                })
            }
            else{
                try{
                    navigator.geolocation.getCurrentPosition((position)=>{
                        dispatch({
                            type:LOCATION,
                            payload: {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                                accuracy: null
                            }
                        })
                    })
                }
                catch(error){
                    console.error(error);
                }
            }
        })
    }
}

function sendError(msg){
    return{
        type: ERROR,
        error: msg
    }
}

export function updateProfilePic(formData){
    return(dispatch)=>{
        axios.post('http://jayclim.com/php/form.php?operation=uploadImage&token='+ document.cookie.split("=")[1], formData).then((resp) => {
            console.log('Axios call update profile resp: ', resp);
            if(resp.data.success){
                dispatch({
                    type: UPDATEPIC,
                    payload: resp.data.data
                })
            }
            else{
                let message = "";
                resp.data.errors.map(function(error_msg){
                    message += error_msg + ". ";
                })
                throw new Error(message);            
            }
        }).catch((error) => {
            dispatch(sendError(error.message));
    })
    }
}


export function postNewEvent(sendData){
    return (dispatch)=>{
        axios.post(`${BASE_URL}?operation=insertEvent`, sendData).then((resp) => {
            console.log("resp from server: ",resp);
            if(resp.data.success === true){
                dispatch({
                    type: NEWEVENT,
                    payload: resp.data.data
                });
            }
            else{
                let message = "";
                resp.data.errors.map(function(error_msg){
                    message += error_msg + ". ";
                })
                throw new Error(message);            
            }
        }).catch((error) => {
            dispatch(sendError(error.message));
    })
    }
};

export function getUserInfo(data){
    return (dispatch) => {
        axios.post(`${BASE_URL}?operation=getUserInfo`, data).then((resp)=>{
            if(resp.data.success === true){
                dispatch({type: USERINFO,
                    payload: resp.data.data});            }
            else{
                let message = "";
                resp.data.errors.map(function(error_msg){
                    message += error_msg + ". ";
                })
                throw new Error(message);
            }
        }).catch((error) => {
            dispatch(sendError(error.message));
        })
    }

}