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
exports.addProduct = exports.showCart = void 0;
const logger_1 = require("../utils/logger");
const Cart_1 = __importDefault(require("../model/Cart"));
const showCart = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const cart = yield Cart_1.default.findOne({ user: _id }).populate('products.product', 'name image price');
        res.json({ cart });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.showCart = showCart;
const addProduct = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { products } = req.body;
        const cart = yield Cart_1.default.findOneAndUpdate({ user: _id }, {
            $set: {
                products
            }
        }, { new: true, upsert: true });
        res.json({ cart });
    }
    catch (e) {
        logger_1.logger.error(e === null || e === void 0 ? void 0 : e.message);
        res.status(501).json({ error: e === null || e === void 0 ? void 0 : e.message });
    }
});
exports.addProduct = addProduct;
//# sourceMappingURL=cart.controller.js.map