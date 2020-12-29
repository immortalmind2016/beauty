"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingType = void 0;
const mongoose_1 = require("mongoose");
var SettingType;
(function (SettingType) {
    SettingType["CATEGORIES"] = "CATEGORIES";
    SettingType["BRANDS"] = "BRANDS";
    SettingType["ABOUT"] = "ABOUT";
    SettingType["USAGEPOLICY"] = "USAGEPOLICY";
    SettingType["FAQ"] = "FAQ";
    SettingType["SHOPPINGANDDELIVERY"] = "SHOPPINGANDDELIVERY,";
    SettingType["TERMESANDCONDITIONS"] = "  TERMESANDCONDITIONS";
    SettingType["EXCHANGEANDRETURN"] = "EXCHANGEANDRETURN";
    SettingType["DELIVERYCOST"] = "DELIVERYCOST";
})(SettingType = exports.SettingType || (exports.SettingType = {}));
const Settings = new mongoose_1.Schema({
    name: {
        type: String,
        enum: Object.values(SettingType),
    },
    htmlDescription: String,
    brands: [
        {
            name: { type: String, unique: true },
        },
    ],
    categories: [
        {
            name: { type: String, unique: true },
            image: String,
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.model("Settings", Settings);
//# sourceMappingURL=Settings.js.map