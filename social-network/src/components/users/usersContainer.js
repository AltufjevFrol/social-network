import {connect} from "react-redux";
import {linkUpCA, linkDownCA, loadUsers, switchPage, changePage, follow, unfollow} from "../../redux/usersReducer";
import React from 'react';
import Users from "./users";
import withRedirectToLogin from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {
	getCurentLinkPart,
	getCurentPage, getFollowingInProgres, getIsAuth,
	getIsLoading,
	getPageSize,
	getTotalCountUsers,
	getUsers, getUsersReselect
} from "../../redux/users-selectors";
import UsersNew from "./UsersNew";

class UsersContainer extends React.Component {

	componentDidMount() {
		this.props.loadUsers(this.props.pageSize, this.props.curentPage);
	}

	render() {
		/*console.log('start render Users component')*/
		return (
			<UsersNew
				users={this.props.users}
				totalCountUsers={this.props.totalCountUsers}
				pageSize={this.props.pageSize}
				curentLinkPart={this.props.curentLinkPart}
				curentPage={this.props.curentPage}
				isLoading={this.props.isLoading}
				switchPage={this.props.switchPage}
				changePage={this.props.changePage}
				followingInProgres={this.props.followingInProgres}
				unfollow={this.props.unfollow}
				follow={this.props.follow}
				linkUpCA={this.props.linkUpCA}
				linkDownCA={this.props.linkDownCA}
			/>
		)
	}

}

const mapStateToProps = (state) => {
	console.log('start mapStateToProps in Users connect')
	return {
		users: getUsersReselect(state),
		totalCountUsers: getTotalCountUsers(state),
		curentPage: getCurentPage(state),
		pageSize: getPageSize(state),
		isLoading: getIsLoading(state),
		curentLinkPart: getCurentLinkPart(state),
		followingInProgres: getFollowingInProgres(state),
		isAuth: getIsAuth(state)
	}
};

export default compose(connect(mapStateToProps, {
	linkUpCA,
	linkDownCA,
	loadUsers, switchPage, changePage, follow, unfollow,
}), withRedirectToLogin)(UsersContainer)

/*
просто взяли контейнерную компоненту UserContainer и с помощью HOCа withRedirecTotLogin получили другую контейнерную
компоненту которая в зависимости от state.auth.isAuth рендерит UserContainer либо Redirect
*/

