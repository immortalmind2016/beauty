import { Schema, Document, model, Types } from "mongoose";
import bcrypt from "bcrypt";
export interface CartSchema extends Document {}
export enum SettingType {
  CATEGORIES = "CATEGORIES",
  BRANDS = "BRANDS",
  ABOUT = "ABOUT",
  USAGEPOLICY = "USAGEPOLICY",
  FAQ = "FAQ",
  SHOPPINGANDDELIVERY = "SHOPPINGANDDELIVERY,",
  TERMESANDCONDITIONS = "  TERMESANDCONDITIONS",
  EXCHANGEANDRETURN = "EXCHANGEANDRETURN",
  DELIVERYCOST = "DELIVERYCOST",
}
const Settings = new Schema(
  {
    name: {
      type: String,
      enum: Object.values(SettingType),
    },
    htmlDescription: String,
    brands: [
      {
        name: { type: String, unique: true },
      },
    ],
    categories: [
      {
        name: { type: String, unique: true },
        image: String,
      },
    ],
  },
  { timestamps: true }
);

export default model("Settings", Settings);
