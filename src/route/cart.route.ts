import express from 'express';
import { addProduct, showCart } from '../controller/cart.controller';
import PassportJwt from '../auth/PassportJwt';
const router = express.Router();

router.post('/add', PassportJwt.authenticate('user-rule', { session: false }), addProduct);
router.get('/', PassportJwt.authenticate('user-rule', { session: false }), showCart);

export default router;
