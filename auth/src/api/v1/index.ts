import express from 'express';
import auth_controller from './controllers/auth_controller';

const router = express.Router();

router.post('/signup', auth_controller.signup);

export default router;
