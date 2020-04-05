import React from 'react';
import {Field, reduxForm} from 'redux-form';

let FormStatus = (props) => {

	return (
		<form onBlur={props.handleSubmit} onSubmit={props.handleSubmit}>
			<Field component={'input'} placeholder={'new status'} name={'status'} autoFocus={true}/>
		</form>
	);
};

FormStatus = reduxForm({form: 'status'})(FormStatus);

class Status extends React.Component {

	state = {isEdit: false};
	setEdit = () => {
		if (this.props.userId === this.props.myId) {
			this.setState({isEdit: true});
		}
	};
	setShow = () => {
		this.setState({isEdit: false});
	};

	updeteStatus = (formData) => {
		this.props.setStatus(formData.status);
	};

	render() {
		let status = this.state.isEdit ?
			<FormStatus onSubmit={this.updeteStatus}/> :
			<div>{this.props.status}</div>;
		return (
			<div onDoubleClick={this.setEdit} onBlur={this.setShow}>
				{status}
			</div>);
	}

}

export default Status;


class StatusOLD extends React.Component {
	constructor(props) {
		super();
		this.state = {
			status: props.status ? props.status : 'no status...',
			isEdit: false
		};
		this.setEdit = this.setEdit.bind(this);
		this.setShow = this.setShow.bind(this);
		this.inputStatus = this.inputStatus.bind(this);
	}

	setEdit() {
		if (this.props.userId === this.props.myId) {
			this.setState({isEdit: true});
		}
	}

	setShow(e) {
		this.setState({isEdit: false});
		this.props.setStatus(e.target.value);
	}

	inputStatus(e) {
		this.setState({status: e.target.value})
	}

	keyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.setShow(e);
		}
	}

	render() {

		let status = this.state.isEdit ?
			<FormStatus onSubmit={this.setShow}/> :
			<div onDoubleClick={this.setEdit}>{this.props.status}</div>;
		return (
			<div>
				{status}
			</div>);
	}
}


/*
*
* <input autoFocus={true} onChange={this.inputStatus} onKeyDown={this.keyDown} onBlur={this.setShow}
                   value={this.state.status}/>
*
* */