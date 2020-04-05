import React from 'react';
import style from './inputsControls.module.css';

export const InputControl = ({input, meta, ...restProps}) => {
	/*в компоненту Field передает пропс meta и input
	* пропс input нужен для инпутов формы передаем его туда
	* в пропсе мета лежат данные рода: посещала не посещалось поле, ошибки от валидаторов и все такое служебное
	* остальные пропсы которы мы передаем InputControl вроде placeholder нужно передать input
	* */

let isError = meta.touched && meta.invalid && !meta.active;
	return (
		<div>
			<input {...input} {...restProps} className={isError?style.error:''}/>
			<div className={style.errorMessage}>
				{isError? <span>{meta.error}</span>:null}
			</div>
		</div>
	)
};

export const Input = (props)=>{

	debugger;
	let {input, meta, child, ...restProps}=props;
	return <InputControl {...props}><input {...input} {...restProps} /> </InputControl>

};

export const INPUT = (props)=>{
	debugger
	return <input {...props}/>
};

//{input, meta, child, ...props}