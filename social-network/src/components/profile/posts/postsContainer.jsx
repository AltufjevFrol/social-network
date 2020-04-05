import React from 'react';
import styles from './posts.module.css';
import {connect} from 'react-redux';
import Posts from './posts';
import {
	addPostCreateAction,
	addNewSymbolPostCreateAction,
	addLikePostCreateAction
} from '../../../redux/profileReducer';

const mapStateToProps = (state)=> {

	return {
		postsData: state.profilePage.postsData,
	}
};


const PostsContainer = connect(mapStateToProps, {
	addPostCreateAction,
	addNewSymbolPostCreateAction,
	addLikePostCreateAction,
})(Posts);
export default PostsContainer;