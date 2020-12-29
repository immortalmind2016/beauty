"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controller/cart.controller");
const PassportJwt_1 = __importDefault(require("../auth/PassportJwt"));
const router = express_1.default.Router();
router.post('/add', PassportJwt_1.default.authenticate('user-rule', { session: false }), cart_controller_1.addProduct);
router.get('/', PassportJwt_1.default.authenticate('user-rule', { session: false }), cart_controller_1.showCart);
exports.default = router;
//# sourceMappingURL=cart.route.js.map