import axios from 'axios';

const BASE_URL = 'http://jayclim.com/php/form.php';

export const SIGNUP = 'signup';
export const ERROR = 'error';
export const SIGNIN = 'signin';
export const LOCATION = 'location';
export function getSignIn({email, password}){
    return dispatch => {
        axios.post(`${BASE_URL}?operation=signin`, {email, password}).then((resp) => {
            console.log("Sign In resp:", resp);
            if(resp.data.success === true){
                var now = new Date();
                var time = now.getTime();
                var expireTime = time + 86400000;   //token expires in 24 hours
                now.setTime(expireTime);
                document.cookie = "token="+resp.data.token+";expires="+now.toUTCString()+";path=/";
            }
            else{
                throw new Error("invalid login credentials");
            }
            dispatch({
                type: SIGNIN
            });
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
            }
            else{
                let message = "";
                resp.data.errors.map(function(error_msg, val){
                    message += error_msg + ". ";
                })

                throw new Error(message);
            }
            dispatch({
                type: SIGNUP
            }); 
        }).catch((error) => {
            dispatch(sendError(error.message));
        });
    };
};


export function storeLocation(userLocation){
    return {
        type: LOCATION,
        payload: userLocation
    }
}


function sendError(msg){
    return{
        type: ERROR,
        error: msg
    }
}

export function postNewEvent(sendData){
    axios.post(`${BASE_URL}?operation=insertEvent`, sendData).then((resp) => {
        if(resp.data.success === true){
            //trigger axios call to the map
            this.props.exitEventForm();
        }
        else{
            //w/e error msg is
        }
    });
};