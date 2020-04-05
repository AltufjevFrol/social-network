import React from 'react';
import styles from './navbar.module.css';
import {NavLink} from 'react-router-dom'
function Navbar(props){

	return (
			<nav className={styles.nav}>
				<ul>
					<li><NavLink className={styles.ref} activeClassName={styles.active} to="/profile">Profile</NavLink></li>
					<li><NavLink className={styles.ref} activeClassName={styles.active} to="/dialogs">Dialogs</NavLink></li>
					<li><NavLink className={styles.ref} activeClassName={styles.active} to="/1">News</NavLink></li>
					<li><NavLink className={styles.ref} activeClassName={styles.active} to="/2">Music</NavLink></li>
					<li><NavLink className={styles.ref} activeClassName={styles.active} to="/3">Settings</NavLink></li>
					<li><NavLink className={styles.ref} activeClassName={styles.active} to="/users">Users</NavLink></li>
				</ul>
			</nav>
	)
}

export default Navbar;

