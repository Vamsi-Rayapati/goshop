import express from 'express';
import users_controller from './controllers/users_controller';

const router = express.Router();

router.post('/users', users_controller.postUser);
router.get('/users', users_controller.getUsers);
router.get('/users/:userId', users_controller.getUser);
router.delete('/users/:userId', users_controller.deleteUser);
router.patch('/users/:userId', users_controller.patchUser);

export default router;
