import React from 'react';
import Profile from './profile';
import {connect} from 'react-redux';
import API from "../../apiHttpRequest/api.js";
import {setUserInfo, setStatus} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import withRedirectToLogin from "../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let id;
        id = this.props.match.params.userId ? +this.props.match.params.userId : this.props.myId;
        /*if (this.props.userInfo && id === this.props.userInfo.userId) {
            return;
        }*/
        this.props.setUserInfo(id);
        /*this.props.getStatus(id);*/

    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.match.params.userId) {
            this.props.setLoadingCA(true);
            axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.auth.id}`,
                {withCredential: true})
                .then((responce) => {
                    this.props.getUserInfoCA(responce.data);
                    this.props.failGetUserInfoCA(null);
                    this.props.setLoadingCA(false);
                }).catch((e) => {
                this.props.failGetUserInfoCA(e);
                this.props.setLoadingCA(false);
            })
        }

    }*/

    render() {

        return <Profile {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.profilePage.userInfo,
        error: state.profilePage.error,
        isLoading: state.profilePage.isLoading,
        myId: state.auth.id,
        userStatus: state.profilePage.userStatus
    }
};

/*
let ProfileURLContainer = withRouter(withRedirectToLogin(ProfileContainer));

export default connect(mapStateToProps, {
	/!*Здесь будут actionСreaters для userInfo*!/
	setUserInfo
})(ProfileURLContainer);
*/

export default compose(connect(mapStateToProps, {
    /*Здесь будут actionСreaters для userInfo*/
    setUserInfo,
    setStatus
}), withRouter,withRedirectToLogin)(ProfileContainer)