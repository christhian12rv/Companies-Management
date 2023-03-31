import { Request, Response, NextFunction } from 'express';
import { UserTypeEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import logger from '../config/logger';
import formatErrors from '../utils/formatErrors';
import * as UserValidator from '../validators/User.validator';
import config from '../config/config';
import UserService from '../services/User.service';
import Database from '../config/Database';

class UserMiddleware {
	public async findById(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			await UserValidator.findById.validateAsync(req.params);
		} catch (e) {
			const message = 'Ocorreram alguns erros ao buscar usuário';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}

	public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const data = req.body;

		try {
			await UserValidator.create.validateAsync(data);
		} catch (e) {
			const message = 'Ocorreram alguns erros ao criar usuário';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}
		
		try {
			data.password = bcrypt.hashSync(data.password, 10);
			req.body.data = data;
		}catch (e) {
			const message = 'Ocorreram erros internos ao criar usuário';
			logger.error(message);

			return res.status(500).send({ message, });
		}

		next();
	}

	public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { id, } = req.params;
		const data = req.body;

		try {
			await UserValidator.update.validateAsync( { id, ...data, });
		} catch (e) {
			const message = 'Ocorreram alguns erros ao atualizar usuário';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}

	public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { id, } = req.params;

		try {
			await UserValidator._delete.validateAsync({ id, });
		} catch (e) {
			const message = 'Ocorreram alguns erros ao deletar usuário';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}

	public async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const data = req.body;

		try {
			await UserValidator.login.validateAsync(data);
		} catch (e) {
			const message = 'Ocorreram alguns erros ao logar usuário';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}

	public async verifyAuth(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { token, } = req.body;

		if (!token) {
			const message = 'Usuário não está logado';
			logger.info(message);

			return res.status(401).send({ message, });
		}

		try {
			const userToken = await jwt.verify(token, config.jwtSecret);
			const user = await UserService.findById(userToken.id);

			if (user)
				req.user = user;
			else {
				const message = 'Usuário inválido';
				logger.error(message);

				return res.status(401).send({ message, });
			}
		} catch (error) {
			const message = 'Ocorreram erros internos ao verificar usuário';
			logger.error(message);

			res.status(500).send({ message, });
		}

		next();
	}

	public async verifyAdminAuth(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { token, } = req.body;

		if (!token) {
			const message = 'Usuário não está logado';
			logger.info(message);

			return res.status(401).send({ message, });
		}

		try {
			const userToken = await jwt.verify(token, config.jwtSecret);
			const user = await Database.getInstance().getDatabase().user.findFirst({
				where: {
					id: userToken.id,
					type: UserTypeEnum.ADMIN,
				},
			});

			if (user)
				req.user = user;
			else {
				const message = 'Usuário inválido ou não autorizado';
				logger.error(message);

				return res.status(401).send({ message, });
			}
		} catch (error) {
			const message = 'Ocorreram erros internos ao verificar usuário';
			logger.error(message);

			res.status(500).send({ message, });
		}

		next();
	}
}

export default new UserMiddleware();