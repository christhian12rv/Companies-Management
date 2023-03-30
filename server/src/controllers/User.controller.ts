import { Request, Response } from 'express';
import logger from '../config/logger';
import UserService from '../services/User.service';

class UserController {
	public async findAll(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findAll de ${req.originalUrl}`);

		try {
			const users = await UserService.findAll();
			
			const message = 'Usuários buscados com sucesso';
			logger.info(message);

			return res.status(200).send({ message, users, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar usuários';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async findById(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findById de ${req.originalUrl}`);

		const { id, } = req.params;

		try {
			const user = await UserService.findById(Number(id));
			
			const message = 'Usuário buscado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, user, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar usuário';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando create de ${req.originalUrl}`);

		const data = req.body;

		try {
			const user = await UserService.create(data);
			
			const message = 'Usuário criado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, user, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao criar usuário';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando update de ${req.originalUrl}`);

		const { id, } = req.params;
		const data = req.body;

		try {
			const user = await UserService.update(Number(id), data);
			
			const message = 'Usuário atualizado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, user, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao atualizar usuário';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando delete de ${req.originalUrl}`);

		const { id, } = req.params;

		try {
			const user = await UserService.delete(Number(id));
			
			const message = 'Usuário deletado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, user, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao deletar usuário';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async login(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando login de ${req.originalUrl}`);

		const { email, } = req.body;

		try {
			const { token, user, } = await UserService.login(email);
			
			const message = 'Usuário logado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, token, user, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao logar usuário';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async getAuth(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando getAuth de ${req.originalUrl}`);

		const user = req.user;

		try {

			const message = 'Usuário logado';
			logger.info(message);

			return res.status(200).send({ message, user, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao logar usuário';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}
}

export default new UserController();