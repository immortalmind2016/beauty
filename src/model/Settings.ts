import { Schema, Document, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
export interface CartSchema extends Document {}
enum SettingType {
    CATEGORIES,
    BRANDS,
    ABOUT,
    USAGEPOLICY,
    FAQ,
    SHOPPINGANDDELIVERY,
    TERMESANDCONDITIONS,
    EXCHANGEANDRETURN,
    DELIVERYCOST
}
const Settings = new Schema(
    {
        name: {
            type: String,
            enum: Object.values(SettingType)
        },
        htmlDescription: String,
        brands: Array,
        categories: [
            {
                name: { type: String, unique: true },
                image: String
            }
        ]
    },
    { timestamps: true }
);

export default model('Settings', Settings);
