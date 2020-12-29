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
const faker_1 = __importDefault(require("faker"));
const Product_1 = __importDefault(require("../model/Product"));
const Settings_1 = __importStar(require("../model/Settings"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
mongoose_1.connect(config_1.default.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const categories = [];
const products = [];
const brands = [];
let counter = 0;
while (counter != 10) {
    const category = {
        name: faker_1.default.commerce.department(),
        image: faker_1.default.image.imageUrl(),
    };
    let brand = { name: faker_1.default.company.companyName() };
    if (brands.findIndex((_brand) => _brand.name == brand.name) > -1 ||
        categories.findIndex((_cat) => _cat.name == category.name) > -1) {
        console.log("REPEAT");
        continue;
    }
    brands.push(brand);
    console.log(brand);
    categories.push(category);
    counter++;
    const sliderImages = [
        faker_1.default.image.imageUrl(),
        faker_1.default.image.imageUrl(),
        faker_1.default.image.imageUrl(),
        faker_1.default.image.imageUrl(),
    ];
    const product = {
        brand,
        category,
        image: faker_1.default.image.imageUrl(),
        //@ts-ignore
        isRecommended: faker_1.default.random.boolean(),
        description: faker_1.default.commerce.productDescription(),
        name: faker_1.default.commerce.productName(),
        price: Number(faker_1.default.commerce.price()),
        rates: Math.floor(Number(Math.random() * 5)),
        sliderImages,
    };
    products.push(product);
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Product_1.default.insertMany(products);
    let cat = {
        name: Settings_1.SettingType.CATEGORIES,
        categories,
    };
    let bran = { name: Settings_1.SettingType.BRANDS, brands };
    console.log("START GENERATOR");
    console.log(bran);
    try {
        yield Promise.all([
            Settings_1.default.findOneAndUpdate({ name: Settings_1.SettingType.CATEGORIES }, cat, {
                upsert: true,
            }),
            Settings_1.default.findOneAndUpdate({ name: Settings_1.SettingType.BRANDS }, bran, {
                upsert: true,
            }),
        ]);
    }
    catch (e) {
        console.log(e);
    }
    console.log("END GENERATOR");
}))();
//# sourceMappingURL=generator.js.map