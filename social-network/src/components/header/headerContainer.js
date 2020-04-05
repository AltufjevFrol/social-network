import React from 'react';
import {authMe, logoutMe} from '../../redux/authReducer';
import {connect} from 'react-redux';
import Header from "./header";


class HeaderContainer extends React.Component {

	render() {
		return <Header {...this.props}/>
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.auth.login,
		isAuth: state.auth.isAuth,
	}
};

export default connect(mapStateToProps, {authMe, logoutMe})(HeaderContainer);