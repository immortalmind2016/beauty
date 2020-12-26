import { Schema, Document, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from './User';
export interface ProductSchema {
    user: any;
    product: any;
}
enum RecommonedType {
    NO = 0,
    YES = 1
}
const UserProduct = new Schema(
    {
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
    },
    { timestamps: true }
);
export interface ProductDocument extends Document, ProductSchema {}
UserProduct.index({ user: 1, product: 1 }, { unique: true });
export default model<ProductDocument>('UserProduct', UserProduct);
