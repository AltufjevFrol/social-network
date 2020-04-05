import API from '../apiHttpRequest/api';
import {stopSubmit as stopSubmitCA} from 'redux-form';
import {initializeApp} from "./appReducer";

const SET_USER_DATA = 'SET-USER-DATA';
const SET_WAITING = 'SET-WAITING';
const RESET_USER_DATA = 'RESET-USER-DATA';
const SET_CAPCHA = 'SET-CAPCHA';
const setCapchaCA = (bool, url) => ({type: SET_CAPCHA, bool, url});
export const setUserDataCA = (data) => ({type: SET_USER_DATA, data});
const resetUserDataCA = () => ({type: RESET_USER_DATA});

export const authMe = () => {
	return (despatch) => {
		return API.getAuthMe().then((resp) => {
			if (resp.resultCode === 0) {
				despatch(setUserDataCA(resp.data));
			}
		});

	}

};

export const loginMe = (logData) => {

	return (despatch) => {
		API.setAuthMe(logData).then((resp) => {
			if (resp.resultCode === 0) {
				despatch(setCapchaCA(false, ''));
				API.getAuthMe().then((resp) => {
					if (resp.resultCode === 0) {
						despatch(setUserDataCA(resp.data));
					}
				});
			} else if (resp.resultCode > 0 && resp.resultCode !== 10) {
				despatch(setCapchaCA(false, ''));
				despatch(stopSubmitCA('login', {_error: 'Email or password is wrong!'}));
			} else if (resp.resultCode === 10) {
				API.getCapcha().then((resp) => {
					despatch(setCapchaCA(true, resp.url));
				})
			}
		})
	}
};

export const logoutMe = () => {
	return (despatch) => {
		API.deleteAuthMe().then((resp) => {
			if (resp.resultCode === 0) {
				despatch(resetUserDataCA());
				despatch(authMe());
				despatch(initializeApp())
			}
		})
	}
}

const initialState = {
	id: null,
	login: null,
	email: null,
	isAuth: false,
	withCapcha: false,
	capchaUrl: ''
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.data,
				isAuth: true
			};
		case SET_WAITING:
			return {
				...state,
				inWaitingAuth: action.boolean
			};
		case RESET_USER_DATA:
			return {
				id: null,
				login: null,
				email: null,
				isAuth: false,
			};
		case SET_CAPCHA:
			return {
				...state,
				withCapcha: action.bool,
				capchaUrl: action.url
			};
		default:
			return state;
	}
};

export default authReducer;