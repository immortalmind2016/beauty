import { Document } from "mongoose";
export interface ProductSchema {
    brand?: {
        name: String;
    };
    image?: String;
    price?: Number;
    sliderImages?: String[];
    name?: String;
    description?: String;
    rates?: Number;
    isRecommended?: RecommonedType;
    category?: {
        name: String;
        image: String;
    };
}
export declare enum RecommonedType {
    NO = 0,
    YES = 1
}
export interface ProductDocument extends ProductSchema, Document {
}
declare const _default: import("mongoose").Model<ProductDocument>;
export default _default;
