import React from 'react';
import styles from './profileInfo.module.css';
import userPic from "../../../assets/img/pngguru.com.png";
import PicNotFound from "../../../assets/img/notFound.jpg"
import StatusHook from "../../status/StatusHook.js";


const ProfileInfo = (props) => {

	let notFound = (
		<div className={styles.userInfo}>
			<div className={styles.avatar}><img alt="" src={PicNotFound}/></div>
			<div className={styles.description}>
				NOT FOUND
			</div>
		</div>
	);


	if (props.isLoading) {
		return <div>LOADING...</div>;
	}
	if (props.error) {
		return notFound;
	}

	let profile = props.userInfo;
	let contacts = [];
	for (let c in profile.contacts) {
		if (profile.contacts[c]) {
			contacts.push(<span key={c} className={styles.contact}> <a href={`https://${profile.contacts[c]}`}>{c}</a> </span>);
		}
	}


	let userInfo = (
		<div className={styles.userInfo}>
			<div className={styles.avatar}><img alt=""
																					src={profile.photos.large ? props.userInfo.photos.large : userPic}/>
			</div>
			<div className={styles.description}>
				<div className={styles.fullName}><h1>{profile.fullName}</h1></div>

				<div>Status:
					<StatusHook myId={props.myId} userId={props.userInfo.userId} status={props.userStatus}
									setStatus={props.setStatus}/>
				</div>

				<div className={styles.about}>
					<span className={styles.bold}>О бо мне:</span>
					<br/>
					<span className={styles.italic}>{profile.aboutMe}</span>
				</div>
				<div className={styles.lookingForJob}>
					<span className={styles.bold}>Я ищу работу:</span>
					<span>{profile.lookingForAJob ? 'Да' : 'Нет'}</span>
					<div className={styles.italic}>{profile.lookingForAJobDescription}</div>
				</div>
				<div className={styles.contacts}>
					{contacts}
				</div>
			</div>
		</div>
	);

	return userInfo;
};

export default ProfileInfo;