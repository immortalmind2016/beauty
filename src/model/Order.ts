import { Schema, Document, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
export interface OrderSchema extends Document {}
enum CheckOutType {
    NO = 0,
    YES = 1
}
enum PlaceType {
    HOUSE = 0,
    WORK = 1
}
enum OrderStatus {
    PENDEING = 0,
    RECIEVED = 1,
    PREPERING = 2,
    OUT = 3,
    DELIVRED = 4
}
enum PaymentType {
    VISA = 0,
    MASTERCARD = 1,
    CACHE = 2
}
const Order = new Schema<OrderSchema>(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User'
        },
        Cart: {
            type: Types.ObjectId,
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
    },
    { timestamps: true }
);

export default model<OrderSchema>('Order', Order);
