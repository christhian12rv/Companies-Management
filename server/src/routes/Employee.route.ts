import { Router } from 'express';
import EmployeeController from '../controllers/Employee.controller';
import EmployeeMiddleware from '../middlewares/Employee.middleware';

const employeeRoute = Router();

employeeRoute.get('/', EmployeeController.findAll);
employeeRoute.get('/:id', EmployeeMiddleware.findById, EmployeeController.findById);
employeeRoute.post('/', EmployeeMiddleware.create, EmployeeController.create);
employeeRoute.put('/:id', EmployeeMiddleware.update, EmployeeController.update);
employeeRoute.delete('/:id', EmployeeMiddleware.delete, EmployeeController.delete);

export default employeeRoute;