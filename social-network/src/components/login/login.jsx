import React from 'react';
import styles from './login.module.css';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {loginMe} from '../../redux/authReducer'
import {requiredValidator, maxLengthValidatorCreater, patternValidatorCreater} from "../../utils/validators/validators";
import {Input, INPUT, InputControl} from "../common/inputsControls";
import {Redirect} from "react-router-dom";

let maxLengthValidator = maxLengthValidatorCreater(20);
const regExpEmail = /\S+@\S+\.\S+/;
let patternValidator = patternValidatorCreater(regExpEmail);

let LoginForm = (props) => {

	let errorBlock = null;
	if (props.error) {
		errorBlock = (
			<div><span>{props.error.value}</span></div>
		);
	}
	if (props.withCapcha) {
		errorBlock = (
			<div>
				<div><img src={props.capchaUrl} alt={'capcha'}/></div>
				<div><span>Text from capcha</span> <Field component={'input'} name={'captcha'}/></div>
			</div>
		);
	}


return (
	<form onSubmit={props.handleSubmit}>
		<div>
			<Field
				component={InputControl}
				name={'email'}
				placeholder={'email'}
				validate={[requiredValidator, maxLengthValidator, patternValidator]}
			/>
		</div>
		<div>
			<Field
				component={InputControl}
				name={'password'}
				type={'password'}
				placeholder={'password'}
				validate={[requiredValidator, maxLengthValidator]}
			/>
		</div>
		<div><label><Field component={'input'} name={'rememberMe'} type={'checkbox'}/> remember me </label></div>
		{errorBlock}
		<div>
			<button>Login</button>
		</div>
	</form>
)
}
;

LoginForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
	const onSubmit = (formData) => {
		console.log(formData);
		props.loginMe(formData);
	};
	return (
		props.auth.isAuth?<Redirect to={'/profile'}/>:
		<div className={styles.login}>
			<h1>LOGIN</h1>
			< LoginForm onSubmit={onSubmit} {...props}/>
		</div>
	);
};

const mapDespatchToProps = (state) => ({
	auth: state.auth,
	withCapcha: state.auth.withCapcha,
	capchaUrl: state.auth.capchaUrl
});

export default connect(mapDespatchToProps, {loginMe})(Login);