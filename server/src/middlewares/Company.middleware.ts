import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import formatErrors from '../utils/formatErrors';
import * as CompanyValidator from '../validators/Company.validator';

class CompanyMiddleware {
	public async findById(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			await CompanyValidator.findById.validateAsync(req.params);
		} catch (e) {
			const message = 'Ocorreram alguns erros ao buscar empresa';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}

	public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const data = req.body;

		try {
			await CompanyValidator.create.validateAsync(data);
		} catch (e) {
			const message = 'Ocorreram alguns erros ao criar empresa';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}
		logger.info('PASSOU');
		next();
	}

	public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { id, } = req.params;
		const data = req.body;

		try {
			await CompanyValidator.update.validateAsync( { id, ...data, });
		} catch (e) {
			const message = 'Ocorreram alguns erros ao atualizar empresa';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}

	public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { id, } = req.params;

		try {
			await CompanyValidator._delete.validateAsync({ id, });
		} catch (e) {
			const message = 'Ocorreram alguns erros ao deletar empresa';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}
}

export default new CompanyMiddleware();