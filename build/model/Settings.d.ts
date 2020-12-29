import { Document } from "mongoose";
export interface CartSchema extends Document {
}
export declare enum SettingType {
    CATEGORIES = "CATEGORIES",
    BRANDS = "BRANDS",
    ABOUT = "ABOUT",
    USAGEPOLICY = "USAGEPOLICY",
    FAQ = "FAQ",
    SHOPPINGANDDELIVERY = "SHOPPINGANDDELIVERY,",
    TERMESANDCONDITIONS = "  TERMESANDCONDITIONS",
    EXCHANGEANDRETURN = "EXCHANGEANDRETURN",
    DELIVERYCOST = "DELIVERYCOST"
}
declare const _default: import("mongoose").Model<Document<any>>;
export default _default;
