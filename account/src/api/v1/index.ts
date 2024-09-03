import express from 'express';
import users_controller from './controllers/users_controller';

const router = express.Router();



router.post('/users',users_controller.postUser);
router.get('/users',users_controller.getUsers);
router.post('/users',users_controller.getUser);
// router.get('/users',users_controller.getUsers);


export default router;