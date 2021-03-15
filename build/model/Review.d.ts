import { Document } from "mongoose";
export interface ReviewSchema {
    description: string;
}
export interface ReviewDocument extends ReviewSchema, Document {
}
declare const _default: import("mongoose").Model<ReviewDocument>;
export default _default;
