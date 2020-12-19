"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommonedType = void 0;
const mongoose_1 = require("mongoose");
var RecommonedType;
(function (RecommonedType) {
    RecommonedType[RecommonedType["NO"] = 0] = "NO";
    RecommonedType[RecommonedType["YES"] = 1] = "YES";
})(RecommonedType = exports.RecommonedType || (exports.RecommonedType = {}));
const Product = new mongoose_1.Schema({
    brand: { type: String },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    sliderImages: Array,
    name: { type: String, required: true },
    description: String,
    rates: String,
    isRecommended: {
        type: Boolean,
        default: RecommonedType.NO,
        enum: Object.values(RecommonedType)
    },
    categorie: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Settings.categories'
    }
}, { timestamps: true });
exports.default = mongoose_1.model('Product', Product);
//# sourceMappingURL=Product.js.map