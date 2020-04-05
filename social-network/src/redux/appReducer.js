import {authMe} from './authReducer'
const SET_INITIATED = 'SET-INITIATED';
const setInitiatedCA = ()=>({type:SET_INITIATED});
export const initializeApp = ()=> {
	return (despatch)=>{
		let promises = [
			//despatch(something1),
			//despatch(something2),
			//despatch(something3),
			//despatch(something4),
			//despatch(something5),
			despatch(authMe())
		];
		Promise.all(promises).then(()=>despatch(setInitiatedCA()));
	}
};
const initial = {
	initiated: false
};
const appReducer = (state = initial, action)=>{
	switch (action.type) {
		case SET_INITIATED:
			return {
			...state,
				initiated: true
			};
		default:
			return{...state};
	}
};

export default appReducer;