"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var CartStatus;
(function (CartStatus) {
    CartStatus[CartStatus["ORDERED"] = 0] = "ORDERED";
    CartStatus[CartStatus["NOTORDERED"] = 1] = "NOTORDERED";
})(CartStatus || (CartStatus = {}));
const Cart = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    products: [
        {
            product: {
                type: mongoose_1.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
        },
    ],
    isOrdered: {
        type: Number,
        default: CartStatus.ORDERED,
        enum: Object.values(CartStatus),
    },
    totalMoney: Number,
}, { timestamps: true });
exports.default = mongoose_1.model("Cart", Cart);
//# sourceMappingURL=Cart.js.map