"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var RecommonedType;
(function (RecommonedType) {
    RecommonedType[RecommonedType["NO"] = 0] = "NO";
    RecommonedType[RecommonedType["YES"] = 1] = "YES";
})(RecommonedType || (RecommonedType = {}));
const UserProduct = new mongoose_1.Schema({
    isApproved: {
        type: Boolean,
        default: false
    },
    user: {
        type: 'ObjectId',
        ref: 'User'
    },
    product: {
        type: 'ObjectId',
        ref: 'Product'
    }
}, { timestamps: true });
UserProduct.index({ user: 1, product: 1 }, { unique: true });
exports.default = mongoose_1.model('UserProduct', UserProduct);
//# sourceMappingURL=UserProduct.js.map