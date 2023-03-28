import { UserTypeEnum } from '@prisma/client';

interface UserUpdateType {
	name: string;
	cpf: string;
	email: string;
	type: UserTypeEnum;
}

export default UserUpdateType;