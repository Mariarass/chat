import {createStore} from "vuex";
import AuthAPI from "@/scripts/api/auth/AuthAPI";
import {API_URL} from "@/scripts/api/API";
import axios from "axios";

export default createStore({
	state: {
		isAuth:false,
		user:null,
		isError:''

	},
	getters: {},
	mutations: {
		setIsAuth(state, isAuth) {
			state.isAuth = isAuth;
		},
		setUser(state, user) {
			state.user = user;
		},
		setIsError(state, isError) {
			state.isError = isError;
		}
	},
	actions: {

		async registerUser({ commit }, {email,password}){
			try{
				const res=await AuthAPI.registration(email,password)
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
				const res =await axios.get(`${API_URL}/refresh`, {withCredentials: true})
				localStorage.setItem('token', res.data.accessToken);
				commit('setIsAuth',true)
				commit('setUser',res.data.user)
				return true
			}
			catch (e){
				console.log(e)
			}

		}



	},
	modules: {},
});
