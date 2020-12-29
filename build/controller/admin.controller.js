"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.login = exports.signUp = void 0;
const Admin_1 = __importDefault(require("../model/Admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const logger_1 = require("../utils/logger");
const signUp = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, type } = req.body;
        const newUser = { name, email, password, type };
        const user = yield new Admin_1.default(newUser).save();
        logger_1.logger.info(`New admin registered with email ${email}`);
        res.status(200).json({ success: true });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.signUp = signUp;
const login = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Admin_1.default.findOne({ email });
        if (user) {
            if (user.checkPassword(password)) {
                const jwt = yield jsonwebtoken_1.default.sign({
                    _id: user.id,
                    email: user.email,
                    name: user.name,
                }, config_1.default.JWT_SECRET);
                logger_1.logger.info(`success login as admin with email ${email} `);
                return res.json({ access_token: jwt });
            }
        }
        logger_1.logger.warn(`failed to login as admin with email ${email} `);
        return res.status(401).json({ error: "User not found" });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.login = login;
const getUserData = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const user = yield Admin_1.default.findOne({ _id });
        if (!user)
            return res.status(401).json({ error: "User not found" });
        return res.json({ user });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.getUserData = getUserData;
//# sourceMappingURL=admin.controller.js.map