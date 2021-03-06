import { Document } from "mongoose";
export interface PostSchema {
    image?: String;
    video?: String;
    type: PostType;
    user: String;
}
export declare enum PostType {
    VIDEO = 0,
    IMAGE = 1
}
export interface ProductDocument extends PostSchema, Document {
}
declare const _default: import("mongoose").Model<ProductDocument>;
export default _default;
