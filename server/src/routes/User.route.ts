import { Router } from 'express';
import UserController from '../controllers/User.controller';
import UserMiddleware from '../middlewares/User.middleware';

const userRoute = Router();

userRoute.get('/', UserController.findAll);
userRoute.get('/:id', UserMiddleware.findById, UserController.findById);
userRoute.post('/', UserMiddleware.verifyAdminAuth, UserMiddleware.create, UserController.create);
userRoute.post('/login', UserMiddleware.login, UserController.login);
userRoute.put('/:id', UserMiddleware.verifyAdminAuth, UserMiddleware.update, UserController.update);
userRoute.delete('/:id', UserMiddleware.verifyAdminAuth, UserMiddleware.delete, UserController.delete);

export default userRoute;