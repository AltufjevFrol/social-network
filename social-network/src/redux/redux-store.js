import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunkMiddleware from 'redux-thunk';
import headerReducer from './headerReducer';
import navbarReducer from './navbarReducer';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

import {reducer as formReducer} from 'redux-form';
import appReducer from "./appReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let reducers = combineReducers({
	header: headerReducer,
	navbar: navbarReducer,
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer

});
/*const store = createStore(reducers, applyMiddleware(thunkMiddleware));*/
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
window.store = store;