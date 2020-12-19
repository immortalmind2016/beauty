import express from 'express';
import { signUp, login, getUserData, verifyEmail } from '../controller/user.controller';
import UserPassport from '../auth/UserPassportJwt';
const router = express.Router();

router.post('/signup', signUp);
router.get('/login', login);
router.get('/', UserPassport.authenticate('jwt', { session: false }), getUserData);
router.get('/verify-email', verifyEmail);
export default router;
