import { Schema, Document, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
export interface ProductSchema extends Document {}
enum RecommonedType {
    NO = 0,
    YES = 1
}
const Product = new Schema<ProductSchema>(
    {
        brand: String,
        image: String,
        price: String,
        sliderImages: [String],
        name: String,
        description: String,
        rates: String,
        isRecommended: {
            default: RecommonedType.NO,
            enum: Object.values(RecommonedType)
        },
        categorie: {
            name: String,
            image: String
        }
    },
    { timestamps: true }
);

export default model<ProductSchema>('Product', Product);
