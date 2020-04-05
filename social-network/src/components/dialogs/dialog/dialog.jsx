import React from 'react';
import styles from './dialog.module.css';
import {NavLink} from 'react-router-dom';


const Dialog = (props) => {
    let path = `/dialogs/${props.dialog.name}`;
    return (
        <div className={styles.item}>
            <NavLink to={path} className={styles.ref} activeClassName={styles.active}>{props.dialog.name}</NavLink>
        </div>
    )
};

export default Dialog