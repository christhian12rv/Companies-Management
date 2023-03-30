import UserTypeEnum from '../enums/User/UserTypeEnum';

interface UserUpdateType {
	id: number;
	name?: string;
	cpf?: string;
	email?: string;
	password?: string;
	type?: UserTypeEnum;
}

export default UserUpdateType;