import express from 'express';
import { signUp, login, getUserData } from '../controller/admin.controller';
import PassportJwt from '../auth/PassportJwt';
import { getAll } from '../controller/product.controller';
import { UserType } from '../model/User';
const router = express.Router();

router.get('/', PassportJwt.authenticate(['user-rule', 'admin-rule'], { session: false }), getAll);
export default router;
