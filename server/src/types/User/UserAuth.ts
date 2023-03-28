import { User } from '@prisma/client';

interface UserAuth {
    token: string;
    user: User;
}

export default UserAuth;