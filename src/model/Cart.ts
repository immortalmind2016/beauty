import { Schema, Document, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
export interface CartSchema extends Document {}
enum CartStatus {
    CHCKED = 0,
    NOTCHECKED = 1
}
const Cart = new Schema<CartSchema>(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User'
        },
        products: [
            {
                product: {
                    type: Types.ObjectId,
                    ref: 'Product'
                },
                count: Number
            }
        ],
        isOrdered: {
            type: Boolean,
            default: CartStatus.NOTCHECKED
        },
        totalMoney: Number
    },
    { timestamps: true }
);

export default model<CartSchema>('Cart', Cart);
