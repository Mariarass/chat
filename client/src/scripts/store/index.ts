import {createStore} from "vuex";
import AuthAPI from "@/scripts/api/auth/AuthAPI";
import UsersAPI from "@/scripts/api/users/UsersApi";
import {IMessage, IUser} from "@/scripts/types/users/types";
interface State {
	isAuth: boolean;
	user: IUser|null;
	userList: IUser[];
	currentDialogUser:IUser|null
	isError: string
	currentMessageList:IMessage[]
	arrivedMessage:string[]
	online:[]
	isGeneralChat:boolean,
	isLoading:boolean
}
export default createStore<State>({
	state: {
		isAuth:false,
		user:null,
		userList:[],
		isError:'',
		currentDialogUser:null,
		currentMessageList:[],
		arrivedMessage:[],
		online:[],
		isGeneralChat:false,
		isLoading:false

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
			console.log(messages)
			state.currentMessageList = messages;
		},
		setArrivedMessage(state, data) {
			if (!state.arrivedMessage.includes(data.id)&&data.uniq) {
				state.arrivedMessage = [...state.arrivedMessage, data.id];
			}else{
				state.arrivedMessage = state.arrivedMessage.filter(id => id !== data.id)
			}
		},
		setOnlineList(state, list) {
			state.online = list;
		},
		setIsGeneralChat(state, value) {
			state.isGeneralChat = value;
		},
		setIsLoading(state, value) {
			state.isLoading = value;
				},
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
		async addMessage({commit,state}, message){
			try{
				const from=state.user?._id
				const to=state.currentDialogUser?._id
				const isGeneralChat=state.isGeneralChat
				const res =await UsersAPI.addMessage(from||'',to||'',message,isGeneralChat)
				if(res){
					commit('setCurrentMessageList',[...state.currentMessageList,{
						_id: Math.random(),
						fromSelf:true,
						message,
						time:new Date(),
						sender:from
					}])
				}
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
				commit('setIsLoading',true)
				if(state.isGeneralChat){
					const res =await UsersAPI.getGeneralMessages(from||'')
					commit('setCurrentMessageList',res.data)
				}
				else{
					const res =await UsersAPI.getMessages(from||'',to||'')
					commit('setCurrentMessageList',res.data)
				}
				return true
			}
			catch (e){
				console.log(e)
			}
			finally {
				commit('setIsLoading',false)
			}

		},




	}
});

// import {createStore,Store} from "vuex";
// import Auth, {AuthState} from "@/scripts/store/auth/auth-store";
// import Chat, {ChatState} from "@/scripts/store/chat/chat-store";
//
// interface RootState {
// 	auth: AuthState;
// 	chat: ChatState;
// }
// const store = createStore<RootState>({
// 	modules: {
// 		auth: Auth,
// 		chat: Chat
// 	}
// })
// export type StoreType = Store<RootState>;
//
// export default store