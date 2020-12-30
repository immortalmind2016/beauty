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
exports.getUserProducts = exports.addProductToUser = exports.getAll = exports.getOne = exports.edit = exports.deleteOne = exports.create = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const Product_1 = __importDefault(require("../model/Product"));
const UserProduct_1 = __importDefault(require("../model/UserProduct"));
const logger_1 = require("../utils/logger");
const create = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { brand, category, name, description, image, price, sliderImages, isRecommended, } = req.body;
        const newProduct = {
            brand,
            category,
            name,
            description,
            image,
            price,
            sliderImages,
            isRecommended,
        };
        const product = yield Product_1.default.create(newProduct);
        res.json({ product });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.create = create;
const deleteOne = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.default.deleteOne({ _id: req.params.productId });
        res.json({ sucess: true });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.deleteOne = deleteOne;
const edit = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findOneAndUpdate({ _id: req.body.id }, Object.assign({}, req.body), { new: true });
        res.json({ sucess: true });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.edit = edit;
const getOne = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield Product_1.default.findOne({ _id: productId });
        res.json({ product });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.getOne = getOne;
const getAll = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { page } = req.params;
        const limit = config_1.default.webLimit;
        const skip = Number(page) * limit;
        let products = {};
        let results = [];
        if (req.query.searchBy) {
            let filter = {
                value: (_a = req.query) === null || _a === void 0 ? void 0 : _a.value,
                searchBy: (_b = req.query) === null || _b === void 0 ? void 0 : _b.searchBy,
            };
            let filters = { [filter.searchBy]: filter.value };
            results = yield Promise.all([
                yield Product_1.default.find(filters).limit(limit).skip(skip),
                Product_1.default.find().count(),
            ]);
        }
        else {
            results = yield Promise.all([
                Product_1.default.find().limit(limit).skip(skip),
                Product_1.default.find().count(),
            ]);
        }
        products = results[0];
        res.json({ products, totalResults: results[1], limit });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.getAll = getAll;
const addProductToUser = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        yield UserProduct_1.default.create({
            user: mongoose_1.Types.ObjectId(req.user._id),
            product: mongoose_1.Types.ObjectId(req.body.productId),
        });
        return res.json({ success: true });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.addProductToUser = addProductToUser;
const getUserProducts = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield UserProduct_1.default.find({
            user: req.params.userId,
        }).populate("product");
        res.json({ products });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.getUserProducts = getUserProducts;
//# sourceMappingURL=product.controller.js.map