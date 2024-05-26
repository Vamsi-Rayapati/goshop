import express from 'express';
import UserController from './controllers/UserController';

const router = express.Router();

const userController = new UserController();

router.post('/users',userController.addUser);
router.get('/users',userController.getUsers)

export default router;