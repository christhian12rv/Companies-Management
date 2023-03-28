import { Router } from 'express';
import UserController from '../controllers/User.controller';
import UserMiddleware from '../middlewares/User.middleware';

const userRoute = Router();

userRoute.get('/', UserController.findAll);
userRoute.get('/:id', UserMiddleware.findById, UserController.findById);
userRoute.post('/', UserMiddleware.create, UserController.create);
userRoute.put('/:id', UserMiddleware.update, UserController.update);
userRoute.delete('/:id', UserMiddleware.delete, UserController.delete);

export default userRoute;