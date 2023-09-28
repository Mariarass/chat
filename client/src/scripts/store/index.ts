import {createStore} from "vuex";
import AuthAPI from "@/scripts/api/auth/AuthAPI";
import UsersAPI from "@/scripts/api/users/UsersApi";
import {IMessage, IUser} from "@/scripts/types/users/types";
import {state} from "vue-tsc/out/shared";

interface State {
	isAuth: boolean;
	user: IUser|null;
	userList: IUser[];
	currentDialogUser:IUser|null
	isError: string
	currentMessageList:IMessage[]
}
export default createStore<State>({
	state: {
		isAuth:false,
		user:null,
		userList:[],
		isError:'',
		currentDialogUser:null,
		currentMessageList:[]

	},
	getters: {

	},
	mutations: {
		setIsAuth(state, isAuth) {
			state.isAuth = isAuth;
		},
		setUser(state, user) {
			state.user = user;
		},
		setIsError(state, isError) {
			state.isError = isError;
		},
		setUserList(state, userList) {
			state.userList = userList;
		},
		setCurrentDialogUser(state, dialogUser) {
				state.currentDialogUser = dialogUser;
		},
		setCurrentMessageList(state, messages) {
			state.currentMessageList = messages;
		}
	},
	actions: {

		async registerUser({ commit }, {email,password,username}){
			try{
				const res=await AuthAPI.registration(email,password,username)
				localStorage.setItem('token', res.data.accessToken);
				commit('setIsAuth',true)
				commit('setUser',res.data.user)
				return true
			}
			catch (e:any){
				commit('setIsError', e.response.data.message);
			}

		},
		async loginUser({ commit }, {email,password}){
			try{
				const res=await AuthAPI.login(email,password)
				localStorage.setItem('token', res.data.accessToken);
				commit('setIsAuth',true)
				commit('setUser',res.data.user)
				return true
			}
			catch (e:any){
				commit('setIsError', e.response.data.message);
			}

		},
		async logout({ commit }){
			try{
				await AuthAPI.logout()
				commit('setIsAuth',false)
				commit('setUser',null)
				return true
			}
			catch (e){
				console.log(e)
				commit('setIsError', 'Somting Went wrong');
			}

		},
		async checkAuth({commit}){
			try{
				const res =await AuthAPI.isAuth()
				localStorage.setItem('token', res.data.accessToken);
				commit('setIsAuth',true)
				commit('setUser',res.data.user)
				return true
			}
			catch (e){
				console.log(e)
			}

		},
		async getUsers({commit}){
			try{
				const res =await UsersAPI.getUsers()
				commit('setUserList',res.data)
				return true
			}
			catch (e){
				console.log(e)
			}

		},
		async addMessage({commit,state},message){
			try{
				const from=state.user?._id
				const to=state.currentDialogUser?._id
				const res =await UsersAPI.addMessage(from||'',to||'',message)

				//commit('setUserList',res.data)
				return true
			}
			catch (e){
				console.log(e)
			}

		},
		async getAllMessages({commit,state}){
			try{
				const from=state.user?._id
				const to=state.currentDialogUser?._id

				const res =await UsersAPI.getMessages(from||'',to||'')
				commit('setCurrentMessageList',res.data)
				return true
			}
			catch (e){
				console.log(e)
			}

		},




	},
	modules: {},
});
