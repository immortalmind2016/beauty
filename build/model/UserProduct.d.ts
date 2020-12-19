import { Document } from 'mongoose';
export interface ProductSchema {
    user: any;
    product: any;
}
export interface ProductDocument extends Document, ProductSchema {
}
declare const _default: import("mongoose").Model<ProductDocument>;
export default _default;
