import { Schema, Document, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
export interface ProductSchema {
    brand: String;
    image: String;
    price: Number;
    sliderImages: String[];
    name: String;
    description: String;
    rates?: String;
    isRecommended?: RecommonedType;
    categorie: {
        name: String;
        image: String;
    };
}
export enum RecommonedType {
    NO = 0,
    YES = 1
}
const Product = new Schema<ProductSchema>(
    {
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
            type: Types.ObjectId,
            ref: 'Settings.categories'
        }
    },
    { timestamps: true }
);

export interface ProductDocument extends ProductSchema, Document {}
export default model<ProductDocument>('Product', Product);
