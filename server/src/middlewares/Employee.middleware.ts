import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import formatErrors from '../utils/formatErrors';
import * as EmployeeValidator from '../validators/Employee.validator';

class EmployeeMiddleware {
	public async findById(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			await EmployeeValidator.findById.validateAsync(req.params);
		} catch (e) {
			const message = 'Ocorreram alguns erros ao buscar funcionário';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}

	public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const data = req.body;

		try {
			await EmployeeValidator.create.validateAsync(data);
		} catch (e) {
			const message = 'Ocorreram alguns erros ao criar funcionário';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}

	public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { id, } = req.params;
		const data = req.body;

		try {
			await EmployeeValidator.update.validateAsync( { id, ...data, });
		} catch (e) {
			const message = 'Ocorreram alguns erros ao atualizar funcionário';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}

	public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { id, } = req.params;

		try {
			await EmployeeValidator._delete.validateAsync({ id, });
		} catch (e) {
			const message = 'Ocorreram alguns erros ao deletar funcionário';
			logger.info(message);

			return res.status(400).json({ errors: formatErrors(e), message, });
		}

		next();
	}
}

export default new EmployeeMiddleware();