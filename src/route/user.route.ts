import express from 'express';
import { signUp, login, getUserData } from '../controller/user.controller';
import UserPassport from '../auth/UserPassportJwt';
const router = express.Router();

router.post('/signup', signUp);
router.get('/login', login);
router.get('/', getUserData);
export default router;
