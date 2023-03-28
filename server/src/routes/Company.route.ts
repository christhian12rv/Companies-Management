import { Router } from 'express';
import CompanyController from '../controllers/Company.controller';
import CompanyMiddleware from '../middlewares/Company.middleware';

const companyRoute = Router();

companyRoute.get('/', CompanyController.findAll);
companyRoute.get('/:id', CompanyMiddleware.findById, CompanyController.findById);
companyRoute.post('/', CompanyMiddleware.create, CompanyController.create);
companyRoute.put('/:id', CompanyMiddleware.update, CompanyController.update);
companyRoute.delete('/:id', CompanyMiddleware.delete, CompanyController.delete);

export default companyRoute;