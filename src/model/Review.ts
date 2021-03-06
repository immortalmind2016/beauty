import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
let Types = Schema.Types;
export interface ReviewSchema {
  description: string;
}

const Review = new Schema<ReviewSchema>(
  {
    description: { type: String },
    stars: {
      default: 0,
      type: Number,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
Review.index({ user: 1, product: 1 }, { unique: true });
export interface ReviewDocument extends ReviewSchema, Document {}
export default model<ReviewDocument>("Review", Review);
