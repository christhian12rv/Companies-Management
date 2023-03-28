import { UserTypeEnum } from '@prisma/client';

interface UserCreateType {
	name: string;
	cpf: string;
	email: string;
	password: string;
	type: UserTypeEnum;
}

export default UserCreateType;