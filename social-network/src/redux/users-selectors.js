import {createSelector} from 'reselect';

/*
Старый объект возвращааемый mapStateToProps для Users
{
		users: state.usersPage.users,
		totalCountUsers: state.usersPage.totalCountUsers,
		curentPage: state.usersPage.curentPage,
		pageSize: state.usersPage.pageSize,
		isLoading: state.usersPage.isLoading,
		getCurentLinkPart: state.usersPage.getCurentLinkPart,
		followingInProgres: state.usersPage.followingInProgres,
		isAuth: state.auth.isAuth
}
*/
/*Selector функция которая будет вызвана в mapStateToProps с параметром state и которая вернет какое то значение
* для передачи в пропсы "законекченой" компоненте
* Селекторы могут быть со сложными ресурсо емкими вычислениями и при каждом запуске mapStateToProps возвращать новое
* значение(новый объект), что в случае, если часть стайта от которой зависит компонента, не изменилась, будет приводить
* к ненужному перерендеру. Что бы этого избежать можно для сложных селекторов использовать  библиотеку "reselect"*/

export const getUsers = (state) => state.usersPage.users;

export const getTotalCountUsers = (state) => state.usersPage.totalCountUsers;

export const getCurentPage = (state) => state.usersPage.curentPage;

export const getPageSize = (state) => state.usersPage.pageSize;

export const getIsLoading = (state) => state.usersPage.isLoading;

export const getCurentLinkPart = (state) => state.usersPage.curentLinkPart;

export const getFollowingInProgres = (state) => state.usersPage.followingInProgres;

export const getIsAuth = (state) => state.auth.isAuth;

/*
* Создадим селектор с помощью библиотеки reselect
* Для этого используем createSelector, первым аргументом будет функция в которую передаеться state  и котороя
* возвращает зависимость (простой селектор написанный выше), вторым аргументом передаеться функция с логикой выборки, в которую передаеться зависимость
* и которая возвращает значение для пропсов
* */

export const getUsersReselect = createSelector(getUsers, (usersFromGetUsers)=>{
	/*console.log('START difficult calculate new Users');*/
	return usersFromGetUsers.filter((u)=>true/*возвращаем новый массив с таким же содержимым для примера*/);
});

/*
* Теперь getUsersReselect запускаеться при любом вызове mapStateToProps (а mapStateToProps в свою очередь запускаеться
* при любом вызове dispatch), но:
* при первом вызове getUsersReselect выполнит функцию с "console.log('Start difficult calculate new Users')"
* и запомнит ее результат
* в дальнейшем при каждом вызове getUsersReselect будет сравниваться значение предъидущего вызова getUsers() с новым,
* и если только если значение будет различаться будет вновь запущена
* функция с "console.log('Start difficult calculate new Users')", противном случае будет возвращен результат из кеша
*/