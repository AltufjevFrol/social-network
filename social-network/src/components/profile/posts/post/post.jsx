import React from 'react';
import styles from './post.module.css';
import heart from '../../../../assets/img/PngItem_6449.png'

function Post(props) {

	function clickLike() {
		props.hendlerLike(props.post.id);
	}

	return (
		<div className={styles.blockPost}>
			<div className={styles.post}>{props.post.post}</div>
			<div className={styles.like}
					 onClick={clickLike}
					 style={{background: 'url(' + heart + ') 2px 3px/190% 190% no-repeat'}}
			>
				<div className={styles.heart}>
					{props.likes === 0 ? <span/> : <span> {props.likes}</span>}
				</div>
			</div>
		</div>
	)


}

export default Post;