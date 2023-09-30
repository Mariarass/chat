export interface IUser {
	_id: string;
	email: string;
	username:string
}

export interface IMessage {
	_id: string;
	fromSelf:boolean
	message: string;
	time:Date;
	sender?:string

}



