import API from "../apiHttpRequest/api";

const ADD_POST = 'ADD-POST';
const ADD_LIKE_POST = 'ADD-LIKE-POST';
const ADD_NEW_SYMBOL_POST = 'ADD-NEW-SYMBOL-TEXT';
const GET_USER_INFO = 'GET-USER-INFO';
const FAIL_GET_USER_INFO = 'FAIL-GET-USER-INFO';
const SET_LOADING = 'SET_LOADING';
/*const GET_USER_STATUS = 'GET-USER-STATUS';*/
const SET_USER_STATUS = 'SET-USER-STATUS';

export const addPostCreateAction = () => ({type: ADD_POST});
export const addLikePostCreateAction = (idPost) => ({type: ADD_LIKE_POST, idPost: idPost});
export const addNewSymbolPostCreateAction = (newText) => ({type: ADD_NEW_SYMBOL_POST, newText: newText});
export const getUserInfoCA = (userInfo) => ({type: GET_USER_INFO, userInfo});
export const failGetUserInfoCA = (e) => ({type: FAIL_GET_USER_INFO, e});
export const setLoadingCA = (bool) => ({type: SET_LOADING, value: bool});
export const setUserStatusCA = (status) => ({type: SET_USER_STATUS, value: status});
//export const getUserStatusCA = () => ({type: GET_USER_STATUS});

export const setUserInfo = (id) => {
	return (despatch) => {
		despatch(setLoadingCA(true));
		API.getUser(id).then(resp => {

			despatch(getUserInfoCA(resp));
			despatch(failGetUserInfoCA(null));

			API.getStatus(id).then((status) => {
				if (!(status instanceof Object)) {
					despatch(setUserStatusCA(status));
					despatch(setLoadingCA(false));
				}
			});
		}).catch(e => {
			despatch(failGetUserInfoCA(e));
			despatch(setLoadingCA(false));
		});
	};
};

/*export const getStatus = (id) => {
    return (despatch) => {
        despatch(setLoadingCA(true));
        API.getStatus(id).then((status) => {
            if (!(status instanceof Object)) {
                despatch(setUserStatusCA(status));
            }
            despatch(setLoadingCA(false));
        })
    };
};*/
export const setStatus = (status) => {
	return (despatch) => {
		despatch(setLoadingCA(true));
		API.setStatus(status).then((resp) => {
			if (resp.resultCode === 0) {
				despatch(setUserStatusCA(status));
			} else {
				console.log(resp.message);
			}
			despatch(setLoadingCA(false));
		})
	};
};

let initialState = {
	userInfo: null,
	postsData: [{id: 1, like: 0, post: 'Hello!'}, {id: 2, like: 3, post: `What's up?!`}],
	newPostText: '',
	error: null,
	isLoading: true,
	userStatus: null,

};

function profileReducer(state = initialState, action) {

	const addPost = () => {
		let copyState = {...state};
		copyState.postsData = [...state.postsData];
		let lastPost = state.postsData[state.postsData.length - 1];
		let id = lastPost ? lastPost.id + 1 : 1;
		let like = 0;
		let post = state.newPostText;
		state.newPostText = '';
		let time = new Date();
		let PostItem = {id, post, like, time};
		copyState.postsData.push(PostItem);
		return copyState;
	};

	const addLikePost = (idPost) => {
		let copyState = {
			...state,
			postsData: [...state.postsData]
		};

		let post;
		copyState.postsData.forEach((p, i) => {
			if (p.id === idPost) {
				post = {p, i};
			}
		});
		if (post) {
			let copyPost = {...post.p};
			++copyPost.like;
			copyState.postsData.splice(post.i, 1, copyPost);
		}
		return copyState;
	};
	const addNewSymbolPost = (newText) => {
		let copyState = {...state};
		copyState.newPostText = newText;
		return copyState;
	};

	switch (action.type) {
		case ADD_POST:
			return addPost();
		case ADD_LIKE_POST:
			return addLikePost(action.idPost);
		case ADD_NEW_SYMBOL_POST:
			return addNewSymbolPost(action.newText);
		case GET_USER_INFO:
			return {
				...state,
				userInfo: action.userInfo
			};
		case FAIL_GET_USER_INFO:
			return {
				...state,
				error: action.e
			};
		case SET_LOADING:
			return {
				...state,
				isLoading: action.value,
			};
		case SET_USER_STATUS:
			return {
				...state,
				userStatus: action.value,
			};

		default:
			return state;
	}

};

export default profileReducer;