import { Router } from 'express';
import { login, create, createRandom, getUser } from './user.controller';
import { loginSchema, signUpSchema } from './validation';
import ValidateRequest from '../middlewares/validateRequest';
import { authenticateToken } from '../middlewares/authenticateToken';
import { cacheUser } from '../middlewares/redis';


const router = Router();

router.route('/signin').post(loginSchema, ValidateRequest,login);
router.route('/signup').post(signUpSchema, ValidateRequest, create);
router.route('/randomuser').get(createRandom);
router.route('/account').get(authenticateToken, getUser);
router.route('/admin/signin').post(loginSchema, ValidateRequest, login);
router.route('/admin/account').get(authenticateToken, getUser);

export default router;
