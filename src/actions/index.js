import axios from "axios";

const BASE_URL = "https://jayclim.com/php/form.php";

export const SIGNUP = "signup";
export const ERROR = "error";
export const SIGNIN = "signin";
export const LOCATION = "location";
export const USERINFO = "userinfo";
export const NEWEVENT = "newevent";
export const SIGNOUT = "signout";
export const UPDATEPIC = "updateprofilepic";
export const CLEARERRORS = "clearerrors";
export const RESETLOCATION = "resetlocation";

export function clearErrors() {
	return {
		type: CLEARERRORS
	};
}

export function getSignIn({ email, password }, history) {
	return dispatch => {
		axios
			.post(`${BASE_URL}?operation=signin`, { email, password })
			.then(resp => {
				if (resp.data.success === true) {
					var now = new Date();
					var time = now.getTime();
					var expireTime = time + 86400000; //24 hours
					now.setTime(expireTime);
					document.cookie =
						"token=" +
						resp.data.token +
						";expires=" +
						now.toUTCString() +
						";path=/";
					history.push("/home");
					dispatch({
						type: SIGNIN
						// payload: resp
					});
				} else {
					dispatch(sendError(resp.data.errors));

					// dispatch({
					//     type: ERROR,
					//     payload: resp.data.errors
					// })

					// let message = "";
					// resp.data.errors.map(function(error_msg){
					//     message += error_msg + ". ";
					// })
					// throw new Error(message);
				}
			});
		// .catch(error => {
		//     dispatch(sendError(error.message));
		// });
	};
}

export function getSignUp(
	{ fname, lname, phone, email, password, password_conf, dob },
	history
) {
	return dispatch => {
		axios
			.post(`${BASE_URL}?operation=insertUser`, {
				fname,
				lname,
				phone,
				email,
				password,
				password_conf,
				dob
			})
			.then(resp => {
				if (resp.data.success === true) {
					var now = new Date();
					var time = now.getTime();
					var expireTime = time + 86400000; //24 hours
					now.setTime(expireTime);
					document.cookie =
						"token=" +
						resp.data.token +
						";expires=" +
						now.toUTCString() +
						";path=/";
					history.push("/home");
					dispatch({
						type: SIGNUP
						// payload: resp
					});
				} else {
					dispatch(sendError(resp.data.errors));
					// dispatch({
					//     type: ERROR,
					//     payload: resp.data.errors
					// })

					// let message = "";
					// resp.data.errors.map(function(error_msg){
					//     message += error_msg + ". ";
					// })
					// throw new Error(resp.data.errors);
				}
			});
		// .catch((error) => {
		//     console.log(typeof(error));
		//     console.log(error);
		//     dispatch(sendError(error));
		// });
	};
}

export function getSignOut() {
	return dispatch => {
		dispatch({
			type: SIGNOUT
		});
		dispatch({
			type: RESETLOCATION
		});
	};
}

export function storeLocation() {
	return dispatch => {
		try {
			navigator.geolocation.getCurrentPosition(position => {
                console.log('wao', position);
				dispatch({
					type: LOCATION,
					payload: {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
						accuracy: null
					}
				});
			});
		} catch (error) {
			console.error(error);
			axios
				.post(
					"https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB4Ob07sNsJpQo-x5N4d0xjTB99lx15xCc"
				)
				.then(resp => {
					if (resp.status == 200) {
						dispatch({
							type: LOCATION,
							payload: {
								lat: resp.data.location.lat,
								lng: resp.data.location.lng,
								accuracy: resp.data.accuracy
							}
						});
					} else {
						dispatch(sendError(resp.data.errors));
					}
				});
		}
	};
	// axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB4Ob07sNsJpQo-x5N4d0xjTB99lx15xCc").then((resp)=>{
	//     if(resp.status == 200){
	//         dispatch({
	//             type: LOCATION,
	//             payload: {
	//                 lat:resp.data.location.lat,
	//                 lng:resp.data.location.lng,
	//                 accuracy:resp.data.accuracy
	//             }
	//         })
	//     }
	//     else{
	//         try{
	//             navigator.geolocation.getCurrentPosition((position)=>{
	//                 dispatch({
	//                     type:LOCATION,
	//                     payload: {
	//                         lat: position.coords.latitude,
	//                         lng: position.coords.longitude,
	//                         accuracy: null
	//                     }
	//                 })
	//             })
	//         }
	//         catch(error){
	//             console.error(error);
	//             dispatch(sendError(resp.data.errors));
	//         }
	//     }
	// })

	// return(dispatch)=>{
	//     axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB4Ob07sNsJpQo-x5N4d0xjTB99lx15xCc").then((resp)=>{
	//         if(resp.status == 200){
	//             dispatch({
	//                 type: LOCATION,
	//                 payload: {
	//                     lat:resp.data.location.lat,
	//                     lng:resp.data.location.lng,
	//                     accuracy:resp.data.accuracy
	//                 }
	//             })
	//         }
	//         else{
	//             try{
	//                 navigator.geolocation.getCurrentPosition((position)=>{
	//                     dispatch({
	//                         type:LOCATION,
	//                         payload: {
	//                             lat: position.coords.latitude,
	//                             lng: position.coords.longitude,
	//                             accuracy: null
	//                         }
	//                     })
	//                 })
	//             }
	//             catch(error){
	//                 console.error(error);
	//                 dispatch(sendError(resp.data.errors));
	//             }
	//         }
	//     })
	// }
}

function sendError(msg) {
	return {
		type: ERROR,
		payload: msg
	};
}

export function updateProfilePic(formData) {
	return dispatch => {
		axios
			.post(
				`${BASE_URL}?operation=uploadImage&token=` +
					document.cookie.split("=")[1],
				formData
			)
			.then(resp => {
				if (resp.data.success) {
					dispatch({
						type: UPDATEPIC,
						payload: resp.data.data
					});
				} else {
					dispatch(sendError(resp.data.errors));
				}
			});
		// .catch((error) => {
		//     dispatch(sendError(error.message));
		//})
	};
}

export function postNewEvent(sendData) {
	return dispatch => {
		axios.post(`${BASE_URL}?operation=insertEvent`, sendData).then(resp => {
			if (resp.data.success === true) {
				dispatch({
					type: NEWEVENT,
					payload: resp.data.data
				});
			} else {
				dispatch(sendError(resp.data.errors));

				// let message = "";
				// resp.data.errors.map(function(error_msg){
				//     message += error_msg + ". ";
				// })
				// throw new Error(message);
			}
		});
		//     .catch((error) => {
		//         dispatch(sendError(error.message));
		// })
	};
}

export function getUserInfo(data) {
	return dispatch => {
		axios.post(`${BASE_URL}?operation=getUserInfo`, data).then(resp => {
			if (resp.data.success === true) {
				dispatch({
					type: USERINFO,
					payload: resp.data.data
				});
			} else {
				dispatch(sendError(resp.data.errors));

				// let message = "";
				// resp.data.errors.map(function(error_msg){
				//     message += error_msg + ". ";
				// })
				// throw new Error(message);
			}
		});
		// .catch((error) => {
		//     dispatch(sendError(error.message));
		// })
	};
}
