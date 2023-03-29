import UserTypeEnum from '../enums/User/UserTypeEnum';

interface UserRegisterType {
	name: string;
	cpf: string;
	email: string;
	password: string;
	confirmPassword: string;
	type: UserTypeEnum;
}

export default UserRegisterType;