"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateUser = exports.getProfiles = exports.verifyEmail = exports.getUserData = exports.login = exports.signUp = void 0;
const User_1 = __importStar(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendgrid_1 = require("../utils/sendgrid");
const config_1 = __importDefault(require("../config"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../utils/logger");
const signUp = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, email, password, phone, type } = req.body;
        const newUser = { name, email, password, phone, type };
        const user = yield new User_1.default(newUser).save();
        const emailToken = jsonwebtoken_1.default.sign({
            email,
            _id: user._id,
        }, config_1.default.JWT_SECRET);
        let emailSent = false;
        while (!emailSent) {
            try {
                yield sendgrid_1.sendMessage(email, `${config_1.default.URL}/user/verify-email?token=${emailToken}`, user.name);
                logger_1.logger.info(`Verficiation Email sent to ${email}`);
                emailSent = true;
            }
            catch (e) {
                console.log(e);
                console.log((_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.errors);
            }
        }
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
        const user = yield User_1.default.findOne({ email });
        if (user) {
            const isSamePassword = yield user.checkPassword(password);
            if (isSamePassword && user.isVerfied) {
                const jwt = yield jsonwebtoken_1.default.sign({
                    _id: user.id,
                    email: user.email,
                    name: user.name,
                    type: user.type,
                }, config_1.default.JWT_SECRET);
                return res.json({ access_token: jwt });
            }
            else if (isSamePassword && !user.isVerfied) {
                return res.status(401).json({ error: "Email is not verified" });
            }
        }
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
        const user = yield User_1.default.findOne({ _id });
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
const updateUser = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const user = yield User_1.default.findOne({ _id });
        const data = req.body;
        if (!user)
            return res.status(401).json({ error: "User not found" });
        return res.json({
            user: yield User_1.default.findOneAndUpdate({ _id }, Object.assign({}, data), { new: true }),
        });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.updateUser = updateUser;
const getProfiles = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({
            $or: [{ type: User_1.UserType.INFLUENCER }, { type: User_1.UserType.DOCTOR }],
        });
        return res.json({ users });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.getProfiles = getProfiles;
const verifyEmail = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        token = req.query.token;
        console.log(req.query);
        const data = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        yield User_1.default.findOneAndUpdate({ email: data.email }, { $set: { isVerfied: true } }, {});
        res.sendFile(path_1.default.join(__dirname, "../view/verify.html"));
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.verifyEmail = verifyEmail;
//# sourceMappingURL=user.controller.js.map