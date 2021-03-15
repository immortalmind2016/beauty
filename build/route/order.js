"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PassportJwt_1 = __importDefault(require("../auth/PassportJwt"));
const post_controller_1 = require("../controller/post.controller");
const router = express_1.default.Router();
//PassportJwt.authenticate(['user-rule', 'admin-rule'], { session: false })
router.post("/", PassportJwt_1.default.authenticate("user-rule", { session: false }), post_controller_1.createPost);
exports.default = router;
//# sourceMappingURL=order.js.map