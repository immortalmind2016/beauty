"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controller/admin.controller");
const PassportJwt_1 = __importDefault(require("../auth/PassportJwt"));
const router = express_1.default.Router();
router.post('/signup', admin_controller_1.signUp);
router.get('/login', admin_controller_1.login);
router.get('/', PassportJwt_1.default.authenticate('admin-rule', { session: false }), admin_controller_1.getUserData);
exports.default = router;
//# sourceMappingURL=admin.route.js.map