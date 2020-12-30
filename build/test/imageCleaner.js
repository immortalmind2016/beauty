"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let ImagesPath = (type) => path_1.default.join(__dirname, "..", "..", "public", `uploads`, `${type}`);
const products = fs_1.default.readdirSync(ImagesPath("products"));
const users = fs_1.default.readdirSync(ImagesPath("users"));
for (let file of products) {
    fs_1.default.unlink(`${ImagesPath("products")}/${file}`, () => { });
}
for (let file of users) {
    fs_1.default.unlink(`${ImagesPath("users")}/${file}`, () => { });
}
//# sourceMappingURL=imageCleaner.js.map