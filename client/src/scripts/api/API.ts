import axios from "axios";
import {AuthResponse} from "@/scripts/types/auth/types";
export const API_URL = `${import.meta.env.VITE_API_URL}/api`

const instance = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

instance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config;
})

instance.interceptors.response.use((config) => {
	return config;
},async (error) => {
	const originalRequest = error.config;
	if (error.response.status == 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
			localStorage.setItem('token', response.data.accessToken);
			return instance.request(originalRequest);
		} catch (e) {
			console.log('НЕ АВТОРИЗОВАН')
		}
	}
	throw error;
})

export default instance;

