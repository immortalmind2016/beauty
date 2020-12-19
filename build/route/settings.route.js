"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settings_controller_1 = require("../controller/settings.controller");
const PassportJwt_1 = __importDefault(require("../auth/PassportJwt"));
const router = express_1.default.Router();
router.post('/', PassportJwt_1.default.authenticate('admin-rule', { session: false }), settings_controller_1.setSettings);
router.get('/:name', PassportJwt_1.default.authenticate('admin-rule', { session: false }), settings_controller_1.getSettings);
exports.default = router;
//# sourceMappingURL=settings.route.js.map