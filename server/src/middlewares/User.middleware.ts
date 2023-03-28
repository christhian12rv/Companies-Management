import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import logger from '../config/logger';
import formatErrors from '../utils/formatErrors';
import * as UserValidator from '../validators/User.validator';

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
		}catch (e) {
			const message = 'Ocorreram erros internos ao criar usuário';
			logger.error(e);

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
}

export default new UserMiddleware();