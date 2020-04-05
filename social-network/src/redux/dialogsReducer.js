const ADD_MESSAGE = 'ADD-MESSAGE';
const ADD_NEW_SYMBOL_MESSAGE = 'ADD-NEW-SYMBOL-MESSAGE';
export const addMessageCreateAction = () => ({type: ADD_MESSAGE});
export const addNewSymbolMessageCreateAction = (newText) => ({type: ADD_NEW_SYMBOL_MESSAGE, newText: newText});

let initialState = {
	dialogsData: [
		{id: 1, name: 'Dimych', messages: []},
		{id: 2, name: 'Andrew', messages: []},
		{id: 3, name: 'Sveta', messages: []},
		{id: 4, name: 'Sasha', messages: []},
		{id: 5, name: 'Viktor', messages: []},
		{id: 6, name: 'Valera', messages: []}
	],
	messagesData: [],
	newMessageText: '',
};

function dialogsReducer(state = initialState, action) {

	const addMessage = () => {
		let lastMessage = state.messagesData[state.messagesData.length - 1];
		let id = lastMessage ? lastMessage.id + 1 : 1;
		let from = 'me';
		let pathArr = window.location.pathname.split('/');
		let nameDialog = pathArr[pathArr.length - 1];
		let to = nameDialog;
		let message = state.newMessageText;
		state.newMessageText = '';
		let time = new Date();
		let MessageItem = {id, from, to, message, time};
		return {
			...state,
			messagesData: [...state.messagesData, MessageItem]
		};
	};

	const addNewSymbolMessage = (newText) => {
		return {
			...state,
			newMessageText: newText
		}
	};

	switch (action.type) {
		case ADD_MESSAGE:
			return addMessage();
		case ADD_NEW_SYMBOL_MESSAGE:
			return addNewSymbolMessage(action.newText);
		default:
			return state;
	}

}

export default dialogsReducer;