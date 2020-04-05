import React from 'react';
import store from "./redux/redux-store";
import App from "./App";

let Context = React.createContext(null);

export const Provider = (props) => {
	return <Context.Provider value={props.store}>
		{props.children}
	</Context.Provider>
};
export default Context;

