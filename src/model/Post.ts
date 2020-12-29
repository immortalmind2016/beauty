import { Schema, Document, model, Types } from "mongoose";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
export interface PostSchema {
  image: string;
  video: string;
}
export enum PostType {
  VIDEO = 0,
  IMAGE = 1,
}
const Post = new Schema<PostSchema>(
  {
    brand: { type: String },
    image: { type: String, required: true },
    video: String,
    type: {
      type: Boolean,
      default: PostType.IMAGE,
      enum: Object.values(PostType),
    },
    user: {
      type: Types.ObjectId,
      ref: "String",
    },
  },
  { timestamps: true }
);

export interface ProductDocument extends PostSchema, Document {}
export default model<ProductDocument>("Post", Post);
