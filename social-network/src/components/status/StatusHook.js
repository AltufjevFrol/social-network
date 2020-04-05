import React, {useEffect, useState} from "react";
import {Field, reduxForm} from 'redux-form';

let FormStatus = (props) => {

	return (
		<form onBlur={props.handleSubmit} onSubmit={props.handleSubmit}>
			<Field component={'input'} placeholder={'new status'} name={'status'} autoFocus={true}/>
		</form>
	);
};
FormStatus = reduxForm({form: 'status'})(FormStatus);

const StatusHook = (props) => {

	let [editMode, setEditMode] = useState(false);
	/*let [time, setTime] = useState(0);
	let [interval, setID] = useState(false);
	useEffect(() => {
		console.log('SET INTERVAL')
		let intervalId = setInterval(() => {
			setTime(++time)
		}, 1000);
		setID(true);
		return () => {
			clearInterval(intervalId);
			console.log('INTERVAL STOP')
		}
	},[interval]);
*/
	const setEdit = () => {
		if (props.userId === props.myId) {
			setEditMode(true);
		}
	};

	const setShow = (formData) => {

		if (formData.status) {
			props.setStatus(formData.status);
		}
		setEditMode(false);
	};

	/*console.log('Возвращаю разметку');*/
	return (
		<div>
			{/*<div>{time}</div>*/}
			{
				editMode ?
					<FormStatus onSubmit={setShow}/> :
					<div onDoubleClick={setEdit}>{props.status}</div>
			}
		</div>);
};

export default StatusHook;