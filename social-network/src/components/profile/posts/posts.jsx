import React, {Component} from 'react';
import styles from './posts.module.css';
import Post from './post/post';
import Sender from '../../sender/sender';
import {addLikePostCreateAction, addPostCreateAction} from "../../../redux/profileReducer";


class Posts extends Component {

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return true;
	}

	render() {
		let posts = this.props.postsData.map((post) => (
			<Post key={post.id} post={post} likes={post.like} hendlerLike={this.props.addLikePostCreateAction}/>));
		console.log('RENDER Posts');
		console.log(this.props);
		return (
			<div className={styles.blok_posts}>
				<h1>My posts</h1>
				<Sender hendlerSend={this.props.addPostCreateAction} hendlerInput={this.props.addNewSymbolPostCreateAction}/>
				{posts}
			</div>
		)
	}
}

export default Posts;

