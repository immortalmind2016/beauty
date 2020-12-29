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
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
mongoose_1.connect(config_1.default.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const Product_1 = __importDefault(require("../model/Product"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Start cleaning db");
        yield Product_1.default.deleteMany();
        console.log("Db cleaned");
    }
    catch (e) {
        console.log(e);
    }
}))();
//# sourceMappingURL=clear.js.map