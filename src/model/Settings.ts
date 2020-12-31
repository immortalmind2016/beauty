import { Schema, Document, model, Types } from "mongoose";
import bcrypt from "bcrypt";
export interface CartSchema extends Document {}
export enum SettingType {
  CATEGORIES = "CATEGORIES",
  BRANDS = "BRANDS",
  HOMESLIDER = "HOMESLIDER",
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
    homeSlider: {
      type: [
        new Schema({
          image: String,
          name: String,
        }),
      ],
      default: [],
    },
    brands: [
      {
        name: { type: String },
        image: String,
      },
    ],
    categories: [
      {
        name: { type: String },
        image: String,
      },
    ],
  },
  { timestamps: true }
);

export default model("Settings", Settings);
