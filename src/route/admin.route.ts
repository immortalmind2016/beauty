import express from 'express';
import { signUp, login, getUserData } from '../controller/admin.controller';
import AdminPassport from '../auth/AdminPassportJwt';
const router = express.Router();

router.post('/signup', signUp);
router.get('/login', login);
router.get('/', AdminPassport.authenticate('jwt', { session: false }), getUserData);
export default router;
