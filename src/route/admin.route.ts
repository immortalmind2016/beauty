import express from 'express';
import { signUp, login, getUserData } from '../controller/admin.controller';
import PassportJwt from '../auth/PassportJwt';
const router = express.Router();

router.post('/signup', signUp);
router.get('/login', login);
router.get('/', PassportJwt.authenticate('admin-rule', { session: false }), getUserData);

export default router;
