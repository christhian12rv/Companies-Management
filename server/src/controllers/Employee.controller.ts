import { Request, Response } from 'express';
import logger from '../config/logger';
import EmployeeService from '../services/Employee.service';

class EmployeeController {
	public async findAll(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findAll de ${req.originalUrl}`);

		try {
			const employees = await EmployeeService.findAll();
			
			const message = 'Funcionários buscados com sucesso';
			logger.info(message);

			return res.status(200).send({ message, employees, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar funcionários';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async findById(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findById de ${req.originalUrl}`);

		const { id, } = req.params;

		try {
			const employee = await EmployeeService.findById(Number(id));
			
			const message = 'Funcionário buscado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, employee, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar funcionário';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando create de ${req.originalUrl}`);

		const data = req.body;

		try {
			const employee = await EmployeeService.create(data);
			
			const message = 'Funcionário criado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, employee, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao criar funcionário';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando update de ${req.originalUrl}`);

		const { id, } = req.params;
		const data = req.body;

		try {
			const employee = await EmployeeService.update(Number(id), data);
			
			const message = 'Funcionário atualizado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, employee, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao atualizar funcionário';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando delete de ${req.originalUrl}`);

		const { id, } = req.params;

		try {
			const employee = await EmployeeService.delete(Number(id));
			
			const message = 'Funcionário criado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, employee, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao criar funcionário';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}
}

export default new EmployeeController();