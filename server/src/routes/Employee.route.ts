import { Router } from 'express';
import EmployeeController from '../controllers/Employee.controller';
import EmployeeMiddleware from '../middlewares/Employee.middleware';
import UserMiddleware from '../middlewares/User.middleware';

const employeeRoute = Router();

employeeRoute.get('/', EmployeeController.findAll);
employeeRoute.get('/:id', EmployeeMiddleware.findById, EmployeeController.findById);
employeeRoute.post('/', UserMiddleware.verifyAuth, EmployeeMiddleware.create, EmployeeController.create);
employeeRoute.put('/:id', UserMiddleware.verifyAuth, EmployeeMiddleware.update, EmployeeController.update);
employeeRoute.delete('/:id', UserMiddleware.verifyAuth, EmployeeMiddleware.delete, EmployeeController.delete);

export default employeeRoute;