import React, {Suspense} from 'react';
import './App.css';
import HeaderContainer from './components/header/headerContainer.js';
import Navbar from './components/navbar/navbar.jsx';
import {BrowserRouter, HashRouter, Route} from 'react-router-dom';
/*import DialogsContainer from "./components/dialogs/dialogsContainer";*/
/*import UsersContainer from "./components/users/usersContainer";*/
import Login from "./components/login/login";
import ProfileContainer from "./components/profile/profileContainer";
import {initializeApp} from "./redux/appReducer";
import {Provider, connect} from "react-redux";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import('./components/dialogs/dialogsContainer'));
import('./components/users/testDinamicImport.js').then((TDI)=>{
	console.log(TDI);
	TDI.func(TDI.data);
	TDI.setData ('new data');
	TDI.func(TDI.data);
	TDI.default();
});
const UsersContainer = React.lazy(()=>import("./components/users/usersContainer"));

console.log(process.env.PUBLIC_URL);

function App(props) {

	return (
		<Suspense fallback={<div style={{background: 'red'}}>Please waiting</div>}>
			< div className="app-wraper">
				< HeaderContainer/>
				< Navbar/>

				<div className="app-wraper-content">
					<Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
					<Route path="/dialogs" component={DialogsContainer}/>
					<Route path="/users" component={UsersContainer}/>
					<Route path="/login" component={Login}/>
				</div>

			</div>
		</Suspense>
	);
}

class AppContainer extends React.Component {

	componentDidMount() {
		this.props.initializeApp()
	}

	render() {
		let isWaiting = !this.props.initiated;
		return (
			isWaiting ? <div>LOADING</div> : <App/>
		)
	}
}

const AppConnected = connect((state) => ({initiated: state.app.initiated}), {initializeApp})(AppContainer);
export default (props) => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				< AppConnected/>
			</Provider>
		</BrowserRouter>
	)
};

/*
component={ProfileContainer}*/
