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
exports.homePage = exports.getSettings = exports.setSettings = void 0;
const Product_1 = __importStar(require("../model/Product"));
const Settings_1 = __importDefault(require("../model/Settings"));
const logger_1 = require("../utils/logger");
const setSettings = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        console.log(Object.assign({}, (name.toLowerCase() == "categories"
            ? {
                $addToSet: { categories: { $each: req.body.categories } },
            }
            : Object.assign({}, req.body))));
        const setting = yield Settings_1.default.findOneAndUpdate({ name }, Object.assign({}, req.body), { upsert: true, new: true });
        res.json({ success: true });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.setSettings = setSettings;
const getSettings = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        console.log("NAME ", name);
        const setting = yield Settings_1.default.findOne({ name: name === null || name === void 0 ? void 0 : name.toLocaleUpperCase() });
        res.json({ [name]: setting });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.getSettings = getSettings;
const homePage = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    let promiseArray;
    promiseArray = [
        Settings_1.default.find({
            $or: [{ name: "CATEGORIES" }, { name: "BRANDS" }, { name: "HOMESLIDER" }],
        }),
        Product_1.default.find({ isRecommended: Product_1.RecommonedType.YES }, "description name price _id image").limit(5),
    ];
    try {
        let results = yield Promise.all(promiseArray);
        console.log(results);
        let categories = (_b = (_a = results[0]) === null || _a === void 0 ? void 0 : _a.filter((setting) => {
            return setting.name == "CATEGORIES";
        })[0]) === null || _b === void 0 ? void 0 : _b.categories;
        let brands = (_d = (_c = results[0]) === null || _c === void 0 ? void 0 : _c.filter((setting) => {
            return setting.name == "BRANDS";
        })[0]) === null || _d === void 0 ? void 0 : _d.brands;
        let homeSlider = (_f = (_e = results[0]) === null || _e === void 0 ? void 0 : _e.filter((setting) => {
            return setting.name == "HOMESLIDER";
        })[0]) === null || _f === void 0 ? void 0 : _f.homeSlider;
        let recommended = results[1];
        res.json({
            categories,
            brands,
            homeSlider,
            recommended,
        });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.homePage = homePage;
//# sourceMappingURL=settings.controller.js.map