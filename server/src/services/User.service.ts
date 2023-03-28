import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import Database from '../config/Database';
import UserAuth from '../types/User/UserAuth';
import UserCreate from '../types/User/UserCreate';
import UserUpdateType from '../types/User/UserUpdate';

class UserService {
	public async findAll(): Promise<User[]> {
		const users = await Database.getInstance().getDatabase().user.findMany();

		return users;
	}

	public async findById(id: number): Promise<User> {
		const user = await Database.getInstance().getDatabase().user.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	public async create(data: UserCreate): Promise<User> {
		const { name, cpf, email, password, type, } = data;
		const user = await Database.getInstance().getDatabase().user.create({
			data: {
				name,
				cpf,
				email,
				password,
				type,
			},
		});

		return user;
	}

	public async update(id: number, data: UserUpdateType): Promise<User> {
		const { name, cpf, email, type, } = data;

		const user = await Database.getInstance().getDatabase().user.update({
			where: {
				id,
			},
			data: {
				...(!!name && { name, }),
				...(!!cpf && { cpf, }),
				...(!!email && { email, }),
				...(!!type && { type, }),
			},
		});

		return user;
	}

	public async delete(id: number): Promise<User> {
		const user = await Database.getInstance().getDatabase().user.delete({
			where: {
				id,
			},
		});

		return user;
	}

	public async login(email: string): Promise<UserAuth> {
		const user = await Database.getInstance().getDatabase().user.findUnique({
			where: {
				email,
			},
		});

		const token = await jwt.sign({ id: user.id, }, config.jwtSecret);

		return { user, token, };
	}
}

export default new UserService();