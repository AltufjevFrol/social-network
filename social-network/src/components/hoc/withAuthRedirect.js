import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const withRedirectToLogin = (Component) => {

	/*
	вот эту компоненту обернем коннектом перед тем как вернуть ее
	return ((props) => {
		if (!props.isAuth) {
			return <Redirect to="/login"/>
		}
		return (<Component {...props}/>);
	});
	*/

	let mapStateToProps = (state)=>{
		return {
			isAuth: state.auth.isAuth
		}
	};

	return connect(mapStateToProps)(
		(props) => {
			if (!props.isAuth) {
				return <Redirect to="/login"/>
			}
			return (<Component {...props}/>);
		}
	)


	};

export default withRedirectToLogin;
