
import { Module } from 'vuex';
import {IMessage, IUser} from "@/scripts/types/users/types";
import UsersAPI from "@/scripts/api/users/UsersApi";

export interface ChatState {
	currentDialogUser:IUser|null
	currentMessageList:IMessage[]
	arrivedMessage:string[]
	isGeneralChat:boolean
	isLoading:boolean
}
const Chat: Module<ChatState, any> = {

	state: () => ({
		currentDialogUser:null,
		currentMessageList:[],
		arrivedMessage:[],
		isGeneralChat:false,
		isLoading:false
	}),
	mutations: {
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
		setIsGeneralChat(state, value) {
			state.isGeneralChat = value;
		},
		setIsLoading(state, value) {
			state.isGeneralChat = value;
		},
	},
	actions:{
		async addMessage({commit,state,getters}, message){
			try{
				const from=getters['auth/user']?._id
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
		async getAllMessages({commit,state,getters}){
			try{
				const from=getters['auth/user']?._id
				const to=state.currentDialogUser?._id

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

		},
	}
};

export default Chat;