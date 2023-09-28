export const validationEmail=(email:string)=>{
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

export const validationPassword=(password:string)=>{
	return password.length < 8
}