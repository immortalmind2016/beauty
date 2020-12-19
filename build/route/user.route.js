"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const PassportJwt_1 = __importDefault(require("../auth/PassportJwt"));
const router = express_1.default.Router();
router.post('/signup', user_controller_1.signUp);
router.get('/login', user_controller_1.login);
router.get('/', PassportJwt_1.default.authenticate('user-rule', { session: false }), user_controller_1.getUserData);
router.get('/verify-email', user_controller_1.verifyEmail);
exports.default = router;
//# sourceMappingURL=user.route.js.map