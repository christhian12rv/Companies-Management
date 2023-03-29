import BaseModelType from '../BaseModelType';
import UserTypeEnum from '../enums/User/UserTypeEnum';

interface UserType extends BaseModelType{
	name: string;
	cpf: string;
	email: string;
	password: string;
	type: UserTypeEnum;
}

export default UserType;