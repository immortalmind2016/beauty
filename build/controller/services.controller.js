"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const config_1 = __importDefault(require("../config"));
const upload = (type, ext) => (req, res) => {
    try {
        let imageUrl = `${config_1.default.ROOT_URL}/uploads/${type}/${req.file.filename}`;
        res.json({ imageUrl });
    }
    catch (e) {
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
};
exports.upload = upload;
//# sourceMappingURL=services.controller.js.map