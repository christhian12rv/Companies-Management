import { Request, Response } from 'express';
import logger from '../config/logger';
import CompanyService from '../services/Company.service';

class CompanyController {
	public async findAll(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findAll de ${req.originalUrl}`);

		try {
			const companies = await CompanyService.findAll();
			
			const message = 'Empresas buscados com sucesso';
			logger.info(message);

			return res.status(200).send({ message, companies, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar empresas';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async findById(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findById de ${req.originalUrl}`);

		const { id, } = req.params;

		try {
			const company = await CompanyService.findById(Number(id));
			
			const message = 'Empresa buscado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, company, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar empresa';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando create de ${req.originalUrl}`);

		const data = req.body;

		try {
			const company = await CompanyService.create(data);
			
			const message = 'Empresa criado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, company, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao criar empresa';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando update de ${req.originalUrl}`);

		const { id, } = req.params;
		const data = req.body;

		try {
			const company = await CompanyService.update(Number(id), data);
			
			const message = 'Empresa atualizado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, company, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao atualizar empresa';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando delete de ${req.originalUrl}`);

		const { id, } = req.params;

		try {
			const company = await CompanyService.delete(Number(id));
			
			const message = 'Empresa criado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, company, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao criar empresa';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}
}

export default new CompanyController();