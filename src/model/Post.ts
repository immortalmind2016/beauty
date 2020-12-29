import { Schema, Document, model, Types } from "mongoose";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
export interface PostSchema {
  image?: String;
  video?: String;
  type: PostType;
  user: String;
}
export enum PostType {
  VIDEO = 0,
  IMAGE = 1,
}
const Post = new Schema<PostSchema>(
  {
    image: { type: String, required: true },
    video: String,
    type: {
      type: Boolean,
      default: PostType.IMAGE,
      enum: Object.values(PostType),
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export interface ProductDocument extends PostSchema, Document {}
export default model<ProductDocument>("Post", Post);
