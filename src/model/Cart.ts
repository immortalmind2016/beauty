import { Schema, Document, model, Types } from "mongoose";
import bcrypt from "bcrypt";
export interface CartSchema extends Document {}
enum CartStatus {
  ORDERED = 0,
  NOTORDERED = 1,
}
const Cart = new Schema<CartSchema>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: Types.ObjectId,
          ref: "Product",
        },
        count: Number,
      },
    ],
    isOrdered: {
      type: Number,
      default: CartStatus.ORDERED,
      enum: Object.values(CartStatus),
    },
    totalMoney: Number,
  },
  { timestamps: true }
);

export default model<CartSchema>("Cart", Cart);
