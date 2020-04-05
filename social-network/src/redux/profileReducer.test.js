import profileReducer, {failGetUserInfoCA, setLoadingCA} from "./profileReducer";

let state = {
	userInfo: null,
	postsData: [{id: 1, like: 0, post: 'Hello!'}, {id: 2, like: 3, post: `What's up?!`}],
	newPostText: '',
	error: null,
	isLoading: true,
	userStatus: null,

};

test('setLoading(false), isLoading should be false', () => {
	let newState = profileReducer(state, setLoadingCA(false));
	expect(newState.isLoading).toBe(false);
});


test('failGetUserInfoCA(e), error should be e', () => {
	let error = new Error('Test error');
	let newState = profileReducer(state, failGetUserInfoCA(error));
	expect(newState.error).toBe(error);
});

test('failGetUserInfoCA(e), error should be e', () => {
	let error = new Error('Test error');
	let newState = profileReducer(state, failGetUserInfoCA(error));
	expect(newState.error).toBe(error);
});
