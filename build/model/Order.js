"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var CheckOutType;
(function (CheckOutType) {
    CheckOutType[CheckOutType["NO"] = 0] = "NO";
    CheckOutType[CheckOutType["YES"] = 1] = "YES";
})(CheckOutType || (CheckOutType = {}));
var PlaceType;
(function (PlaceType) {
    PlaceType[PlaceType["HOUSE"] = 0] = "HOUSE";
    PlaceType[PlaceType["WORK"] = 1] = "WORK";
})(PlaceType || (PlaceType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["PENDEING"] = 0] = "PENDEING";
    OrderStatus[OrderStatus["RECIEVED"] = 1] = "RECIEVED";
    OrderStatus[OrderStatus["PREPERING"] = 2] = "PREPERING";
    OrderStatus[OrderStatus["OUT"] = 3] = "OUT";
    OrderStatus[OrderStatus["DELIVRED"] = 4] = "DELIVRED";
})(OrderStatus || (OrderStatus = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType[PaymentType["VISA"] = 0] = "VISA";
    PaymentType[PaymentType["MASTERCARD"] = 1] = "MASTERCARD";
    PaymentType[PaymentType["CACHE"] = 2] = "CACHE";
})(PaymentType || (PaymentType = {}));
const Order = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User'
    },
    Cart: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Cart'
    },
    country: String,
    city: String,
    floor: String,
    neighborhood: String,
    address: {
        lat: Number,
        lng: Number
    },
    placeType: {
        type: Number,
        enum: Object.values(PlaceType)
    },
    backupPhone: String,
    note: String,
    payment: {
        type: Number,
        enum: Object.values(PaymentType)
    },
    status: {
        type: Number,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDEING
    }
}, { timestamps: true });
exports.default = mongoose_1.model('Order', Order);
//# sourceMappingURL=Order.js.map