import { Schema, Document, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
export interface ProductSchema extends Document {
    brand: String;
    image: String;
    price: String;
    sliderImages: String[];
    name: String;
    description: String;
    rates: String;
    isRecommended: RecommonedType;
    categorie: {
        name: String;
        image: String;
    };
    createdAt: Date;
    updatedAt: Date;
}
enum RecommonedType {
    NO = 0,
    YES = 1
}
const Product = new Schema<ProductSchema>(
    {
        user: {
            type: Types.ObjectId(),
            ref: 'User'
        },
        product: {
            type: Types.ObjectId(),
            ref: 'Product'
        }
    },
    { timestamps: true }
);

export default model<ProductSchema>('Product', Product);
