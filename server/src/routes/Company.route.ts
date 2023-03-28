import { Router } from 'express';
import CompanyController from '../controllers/Company.controller';
import CompanyMiddleware from '../middlewares/Company.middleware';
import UserMiddleware from '../middlewares/User.middleware';

const companyRoute = Router();

companyRoute.get('/', CompanyController.findAll);
companyRoute.get('/:id', CompanyMiddleware.findById, CompanyController.findById);
companyRoute.post('/', UserMiddleware.verifyAuth, CompanyMiddleware.create, CompanyController.create);
companyRoute.put('/:id', UserMiddleware.verifyAuth, CompanyMiddleware.update, CompanyController.update);
companyRoute.delete('/:id', UserMiddleware.verifyAuth, CompanyMiddleware.delete, CompanyController.delete);

export default companyRoute;