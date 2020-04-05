import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from "./App";
import store from './redux/redux-store';
/*import Context, {Provider} from './context';*/
import {Provider} from 'react-redux'

/*setInterval (()=> {
	store.dispatch({type: 'TEST ACTION'});
	console.log('trow TEST ACTION')
}, 1000);*/

ReactDOM.render(< App/>, document.getElementById('root'));

/*
function updateApp() {
}

updateApp();
store.subscribe(()=>{
	console.log(store.getState());
updateApp();
});*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
