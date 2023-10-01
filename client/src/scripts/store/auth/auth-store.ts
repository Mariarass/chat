import { Module } from 'vuex';
import {  IUser } from "@/scripts/types/users/types";
import AuthAPI from "@/scripts/api/auth/AuthAPI";
import UsersAPI from "@/scripts/api/users/UsersApi";

export interface AuthState {
	isAuth: boolean;
	user: IUser | null;
	isError: string;
	online: string[];
	userList: [],
}
const Auth: Module<AuthState, any> = {

	state: () => ({
		isAuth: false,
		user: null,
		userList: [],
		isError: '',
		online: [],
	}),
	getters:{ user: state => state.user},
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

		setOnlineList(state, list) {
			state.online = list;
		},
		setUserList(state, userList) {
			state.userList = userList;
		},

	},
	actions:{

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
		async getUsers({commit,state}){
			try{
				if(state.user){
					const res =await UsersAPI.getUsers(state.user._id)
					commit('setUserList',res.data)
				}
				return true
			}
			catch (e){
				console.log(e)
			}

		},
	}
};

export default Auth;