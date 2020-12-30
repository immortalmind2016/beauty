"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_controller_1 = require("../controller/services.controller");
const router = express_1.default.Router();
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uploader = (type, ext) => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path_1.default.join(__dirname, "..", "..", "public", `uploads`, `${type}`));
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ext);
        },
    });
    return multer_1.default({ storage });
};
router.post("/user-image", 
///PassportJwt.authenticate(["user-rule", "admin-rule"], { session: false }),
uploader("users", ".png").single("image"), services_controller_1.upload("users", ".png"));
router.post("/product-image", 
///PassportJwt.authenticate(["user-rule", "admin-rule"], { session: false }),
uploader("products", ".png").single("image"), services_controller_1.upload("products", ".png"));
exports.default = router;
//# sourceMappingURL=services.route.js.map