import {AxiosResponse} from 'axios';
import instance from "@/scripts/api/API";
import {AuthResponse} from "@/scripts/types/auth/types";

export default class AuthAPI {

	static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return instance.post<AuthResponse>('/login', {email, password})
	}

	static async registration(email: string, password: string,username:string): Promise<AxiosResponse<AuthResponse>> {
		return instance.post<AuthResponse>('/registration', {email, password,username})
	}

	static async logout(): Promise<void> {
		return instance.post('/logout')
	}

	static async  isAuth(){
		return instance.get<AuthResponse>('/refresh')
	}
	static async  getUsers(){
		return instance.get<AuthResponse>('/users')
	}


}

