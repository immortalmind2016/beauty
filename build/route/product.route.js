"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PassportJwt_1 = __importDefault(require("../auth/PassportJwt"));
const product_controller_1 = require("../controller/product.controller");
const router = express_1.default.Router();
//PassportJwt.authenticate(['user-rule', 'admin-rule'], { session: false })
router.get('/', product_controller_1.getAll);
router.patch('/', PassportJwt_1.default.authenticate('admin-rule', { session: false }), product_controller_1.edit);
router.delete('/', PassportJwt_1.default.authenticate('admin-rule', { session: false }), product_controller_1.deleteOne);
router.post('/', PassportJwt_1.default.authenticate('admin-rule', { session: false }), product_controller_1.create);
router.post('/assign', PassportJwt_1.default.authenticate('user-rule', { session: false }), product_controller_1.addProductToUser);
router.get('/user/:userId', product_controller_1.getUserProducts);
router.get('/:productId', product_controller_1.getOne);
exports.default = router;
//# sourceMappingURL=product.route.js.map