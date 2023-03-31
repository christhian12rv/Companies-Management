import * as express from 'express';
import * as cors from 'cors';
import logger from './config/logger';
import config from './config/config';
import userRoute from './routes/User.route';
import employeeRoute from './routes/Employee.route';
import companyRoute from './routes/Company.route';

export default class App {
	private express: express.Application;

	constructor() {
		this.express = express();
		this.listen();
		this.middlewares();
		this.routes();
	}

	public getApp(): express.Application {
		return this.express;
	}

	private middlewares(): void {
		this.express.use(express.json({
			type: '*/*',
		}));
		this.express.use(cors());
	}

	private listen(): void {
		this.express.listen(config.port, () => {
			logger.info(`Server running on: ${config.serverUrl}${config.port}`);
		});
	}

	private routes(): void {
		this.express.use('/api/user', userRoute);
		this.express.use('/api/employee', employeeRoute);
		this.express.use('/api/company', companyRoute);
	}
}