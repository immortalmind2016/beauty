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
const Cart = new Schema<CartSchema>(
    {
        name: {
            type: String,
            enum: Object.values(SettingType)
        },
        htmlDescription: String,
        brands: [String],
        categories: [
            {
                name: String,
                image: String
            }
        ]
    },
    { timestamps: true }
);

export default model<CartSchema>('Cart', Cart);
