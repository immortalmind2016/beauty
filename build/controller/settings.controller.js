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
exports.getSettings = exports.setSettings = void 0;
const module_1 = require("@npm-immortal-user/utils/module");
const Settings_1 = __importDefault(require("../model/Settings"));
const logger = module_1.getLogger('settingsController', 'info');
const setSettings = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        console.log(Object.assign({}, (name.toLowerCase() == 'categories'
            ? {
                $addToSet: { categories: { $each: req.body.categories } }
            }
            : Object.assign({}, req.body))));
        const setting = yield Settings_1.default.findOneAndUpdate({ name }, Object.assign({}, req.body), { upsert: true, new: true });
        res.json({ success: true });
    }
    catch (e) {
        logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.setSettings = setSettings;
const getSettings = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        console.log('NAME ', name);
        const setting = yield Settings_1.default.findOne({ name: name === null || name === void 0 ? void 0 : name.toLocaleUpperCase() });
        res.json({ [name]: setting });
    }
    catch (e) {
        logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.getSettings = getSettings;
//# sourceMappingURL=settings.controller.js.map