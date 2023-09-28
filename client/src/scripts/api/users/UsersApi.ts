
import instance from "@/scripts/api/API";
import {IChat, IUser} from "@/scripts/types/users/types";

export default class UsersAPI {
	static async  getUsers(){
		return instance.get<IUser[]>('/users')
	}

	static async  addMessage(from:string,to:string,message:string){
		return instance.post<IChat[]>('/addmsg',{from,to,message})
	}

	static async  getMessages(from:string,to:string){
		return instance.post<IChat[]>('/getmsg',{from,to})
	}



}

