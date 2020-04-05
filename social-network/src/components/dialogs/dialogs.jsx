import React from 'react';
import styles from './dialogs.module.css';
import Dialog from './dialog/dialog.jsx';
import Message from './message/message.jsx'
import Sender from '../sender/sender';


function Dialogs(props) {

	let dialogsItems = props.dialogsData.map((dialog) => <Dialog key={dialog.id} dialog={dialog}/>);

	let messagesItems = props.messagesData.map((message) => <Message key={message.id} message={message}/>);

	return (
		<div className={styles.dialogs}>
			<div className={styles.dialogsItems}>
				{dialogsItems}
			</div>
			<div className={styles.messages}>
				{messagesItems}
			</div>
			<Sender hendlerSend={props.addMessage} hendlerInput={props.addNewSymbolMessage}/>
		</div>
	)


}

export default Dialogs;