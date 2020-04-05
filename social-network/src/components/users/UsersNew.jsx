import React from 'react';
import styles from "./users.module.css";
import userPic from "../../assets/img/pngguru.com.png";
import {NavLink} from 'react-router-dom';
import Paginater from "./Paginater";


const UsersNew = (props) => {

	let usersList = props.users.map((user) => {

		return (
			<div key={user.id} className={styles.userWrap}>
				<div className={styles.avatarBlock}>
					<div className={styles.avatar}>
						<NavLink to={'/profile/' + user.id}>
							<img src={user.photos.small ? user.photos.small : userPic}
									 alt="avatar"
							/>
						</NavLink>

					</div>
					<div className={styles.button}>
						{user.followed ?
							<button
								onClick={() => props.unfollow(user.id)}
								disabled={props.followingInProgres.some(id => id === user.id)}
							>
								Unfollow
							</button> :
							<button
								onClick={() => props.follow(user.id)}
								disabled={props.followingInProgres.some(id => id === user.id)}
							>
								Follow
							</button>
						}
					</div>
				</div>
				<div className={styles.descriptionBlock}>
					<div className={styles.fullName}>{user.name}</div>
					<div className={styles.status}>{user.status ? user.status : 'no status'}</div>
				</div>
			</div>
		)
	});

	let load = <div className={styles.loadingBanner}>LOADING...</div>;

	return (
		<Paginater {...props}>
			<div className={styles.containerUsers}>{props.isLoading === true ? load : usersList}</div>
		</Paginater>
	)
};

export default UsersNew;