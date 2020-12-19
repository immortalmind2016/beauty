import { Document } from 'mongoose';
export interface UserSchema {
    name: String;
    phone: String;
    email: String;
    password: String;
    type?: UserType;
    isVerfied?: Boolean;
    isFacebook?: Boolean;
    salt?: String;
    createdAt?: String;
    updatedAt?: String;
}
export declare enum UserType {
    USER = 0,
    DOCTOR = 1,
    INFLUENCER = 2
}
export interface UserDocument extends Document, UserSchema {
    checkPassword(textPassword: string): boolean;
}
declare const _default: import("mongoose").Model<UserDocument>;
export default _default;
