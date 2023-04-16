import {Router} from 'express';
import { getAllUsers, getMe, login, register } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router()

//Register (http://localhost:3007/api/auth/register)
router.post('/register', register);

//Login (http://localhost:3007/api/auth/login)
router.post('/login', login);

//Get me (http://localhost:3007/api/auth/me),  через мидлвейр проверяем на наличие токена данный запрос
router.get('/me', checkAuth, getMe);     

//Get all((http://localhost:3007/api/auth/all))
router.get('/all', getAllUsers)

export default router;
