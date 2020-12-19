"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
const log4js_1 = __importDefault(require("log4js"));
let appenders = {};
let categories = {};
const getLogger = (name, level) => {
    appenders[name] = { type: "file", filename: `${name}.log` };
    categories[name] = { appenders: [name], level };
    log4js_1.default.configure({
        appenders: Object.assign({ "server": { type: "file", filename: `server.log` } }, appenders),
        categories: Object.assign({ default: { appenders: ["server"], level: "info" } }, categories)
    });
    log4js_1.default.getLogger(name || "server");
};
exports.getLogger = getLogger;
//# sourceMappingURL=logger.js.map