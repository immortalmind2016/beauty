import { Document } from 'mongoose';
export interface AdminSchema {
    name: String;
    email: String;
    password: String;
    type?: UserType;
    salt?: String;
    createdAt?: String;
    updatedAt?: String;
}
declare enum UserType {
    ADMIN = 0
}
export interface AdminDocument extends Document, AdminSchema {
    checkPassword(textPassword: string): boolean;
}
declare const _default: import("mongoose").Model<AdminDocument>;
export default _default;
