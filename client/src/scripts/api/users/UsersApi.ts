
import instance from "@/scripts/api/API";
import {IMessage, IUser} from "@/scripts/types/users/types";

export default class UsersAPI {
	static async  getUsers(currentUserId:string){
		return instance.get<IUser[]>(`users/${currentUserId}`)
	}

	static async  addMessage(from:string,to:string,message:string){
		return instance.post<IMessage>('/addmsg',{from,to,message})
	}

	static async  getMessages(from:string,to:string){
		return instance.post<IMessage[]>('/getmsg',{from,to})
	}



}

