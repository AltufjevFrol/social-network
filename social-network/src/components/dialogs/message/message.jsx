import React from 'react';
import styles from './message.module.css';

const Message = (props) => {
    let meClass = props.message.from==='me'? styles.me:'';
    return (
        <div className={`${styles.message} ${meClass}`}>
            {props.message.message}
        </div>
    )
};

export default Message;