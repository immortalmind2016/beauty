"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var SettingType;
(function (SettingType) {
    SettingType[SettingType["CATEGORIES"] = 0] = "CATEGORIES";
    SettingType[SettingType["BRANDS"] = 1] = "BRANDS";
    SettingType[SettingType["ABOUT"] = 2] = "ABOUT";
    SettingType[SettingType["USAGEPOLICY"] = 3] = "USAGEPOLICY";
    SettingType[SettingType["FAQ"] = 4] = "FAQ";
    SettingType[SettingType["SHOPPINGANDDELIVERY"] = 5] = "SHOPPINGANDDELIVERY";
    SettingType[SettingType["TERMESANDCONDITIONS"] = 6] = "TERMESANDCONDITIONS";
    SettingType[SettingType["EXCHANGEANDRETURN"] = 7] = "EXCHANGEANDRETURN";
    SettingType[SettingType["DELIVERYCOST"] = 8] = "DELIVERYCOST";
})(SettingType || (SettingType = {}));
const Settings = new mongoose_1.Schema({
    name: {
        type: String,
        enum: Object.values(SettingType)
    },
    htmlDescription: String,
    brands: [
        {
            name: { type: String, unique: true }
        }
    ],
    categories: [
        {
            name: { type: String, unique: true },
            image: String
        }
    ]
}, { timestamps: true });
exports.default = mongoose_1.model('Settings', Settings);
//# sourceMappingURL=Settings.js.map