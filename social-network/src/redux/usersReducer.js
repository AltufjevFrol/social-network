import API from "../apiHttpRequest/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const GET_USERS = 'GET-USERS';
const SWITCH_NEW_PAGE = 'SWITCH-NEW-PAGE';
const CHANGE_PAGE_SIZE = 'CHANGE-PAGE-SIZE';
const SET_TOTAL_COUNT_USERS = 'SET-TOTAL-COUNT-USERS';
const SHOW_LOADING = 'SHOW-LOADING';
const SHOW_DATE = 'SHOW-DATE';
const LINK_UP = 'LINK-UP';
const LINK_DOWN = 'LINK-DOWN';
const SET_LINK_FIRST = 'SET-LINK-FIRST';
const TOGGLE_FOLLOWING = 'TOGGLE-FOLLOWING';
export const followCA = (idUser) => ({type: FOLLOW, id: idUser});
export const unfollowCA = (idUser) => ({type: UNFOLLOW, id: idUser});
export const getUsersCA = (users) => ({type: GET_USERS, users});
export const switchNewPageCA = (numPage) => ({type: SWITCH_NEW_PAGE, numPage});
export const changePageSizeCA = (newSize) => ({type: CHANGE_PAGE_SIZE, newSize});
export const setTotalCountUsersCA = (totalCount) => ({type: SET_TOTAL_COUNT_USERS, totalCount});
export const showLoadingCA = () => ({type: SHOW_LOADING});
export const showDateCA = () => ({type: SHOW_DATE});
export const linkUpCA = () => ({type: LINK_UP});
export const linkDownCA = () => ({type: LINK_DOWN});
export const setLinkFirstCA = () => ({type: SET_LINK_FIRST});
export const toggleFollowingProgresCA = (isWaiting, id) => ({type: TOGGLE_FOLLOWING, isWaiting, id});

export const loadUsers = (pageSize, curentPage) => {
	return (dispatch) => {
		dispatch(showLoadingCA());
		API.getUsers(pageSize, curentPage)
			.then((response) => {
				dispatch(setTotalCountUsersCA(response.totalCount));
				dispatch(getUsersCA(response.items));
				dispatch(showDateCA());
			});
	};


};

export const switchPage = (numPage, pageSize) => {
	return (dispatch) => {
		dispatch(switchNewPageCA(numPage));
		dispatch(showLoadingCA());
		API.getUsers(pageSize, numPage)
			.then((response) => {
				dispatch(getUsersCA(response.items));
				dispatch(showDateCA());
			});
	};

};

export const changePage = (value) => {
	return (dispatch) => {
		dispatch(changePageSizeCA(value));
		dispatch(switchNewPageCA(1));
		dispatch(setLinkFirstCA());
		dispatch(showLoadingCA());
		API.getUsers(value, 1).then((response) => {
			dispatch(getUsersCA(response.items));
			dispatch(showDateCA());
		});
	};
};

export const follow = (id) => {
	return (dispatch) => {
		dispatch(toggleFollowingProgresCA(true, id));
		API.followUser(id).then((responce) => {

			if (responce.resultCode === 0) {
				dispatch(followCA(id));
			} else {
				console.log(responce.messages)
			}
			dispatch(toggleFollowingProgresCA(false, id));
		}).catch((e) => {
			console.log('Не удалось получить список пользователей. Запрос завершился с ошибкой:')
			console.log(e);
		});
	};

};

export const unfollow = (id) => {
	return (dispatch)=>{
		dispatch(toggleFollowingProgresCA(true, id));
		API.unFollowUser(id).then((responce) => {

			if (responce.resultCode === 0) {
				dispatch(unfollowCA(id));
			} else {
				console.log(responce.messages)
			}
			dispatch(toggleFollowingProgresCA(false, id))
		});
	};

};

let initialState = {
	users: [],
	totalCountUsers: 0,
	curentPage: 1,
	pageSize: 50,
	isLoading: true,
	curentLinkPart: 0,
	followingInProgres: []
};

const userReducer = (state = initialState, action) => {

	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map((user) => {
					if (user.id === action.id) {
						return {...user, followed: true}
					}
					return user;
				}),
			};
		case UNFOLLOW:
			return {
				...state,
				users: state.users.map((user) => {
					if (user.id === action.id) {
						return {...user, followed: false}
					}
					return user;
				}),
			};
		case GET_USERS:
			return {...state, users: [...action.users]};
		case SWITCH_NEW_PAGE:
			return {...state, curentPage: action.numPage};
		case CHANGE_PAGE_SIZE:
			return {...state, pageSize: action.newSize};
		case SET_TOTAL_COUNT_USERS:
			return {...state, totalCountUsers: action.totalCount};
		case SHOW_LOADING:
			return {...state, isLoading: true};
		case SHOW_DATE:
			return {...state, isLoading: false};
		case LINK_UP:
			return {...state, curentLinkPart: state.curentLinkPart + 1};
		case LINK_DOWN:
			return {...state, curentLinkPart: state.curentLinkPart - 1};
		case SET_LINK_FIRST:
			return {...state, curentLinkPart: 1};
		case TOGGLE_FOLLOWING:
			return {
				...state,
				followingInProgres: action.isWaiting ?
					[...state.followingInProgres, action.id] :
					state.followingInProgres.filter(id => id !== action.id)
			};
		default:
			return state;
	}

};
export default userReducer;