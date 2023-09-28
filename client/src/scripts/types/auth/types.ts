import {IUser} from "@/scripts/types/users/types";

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}
