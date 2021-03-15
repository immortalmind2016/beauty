"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Types = mongoose_1.Schema.Types;
const Review = new mongoose_1.Schema({
    description: { type: String },
    stars: {
        default: 0,
        type: Number,
    },
    product: {
        type: Types.ObjectId,
        ref: "Product",
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
Review.index({ user: 1, product: 1 }, { unique: true });
exports.default = mongoose_1.model("Review", Review);
//# sourceMappingURL=Review.js.map