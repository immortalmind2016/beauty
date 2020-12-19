import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';
export interface AdminSchema {
    name: String;
    email: String;
    password: String;
    type?: UserType;
    salt?: String;
    createdAt?: String;
    updatedAt?: String;
}
enum UserType {
    ADMIN = 0
}
const Admin: Schema = new Schema<AdminDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: {
            type: Number,
            default: UserType.ADMIN,
            required: true
        }
    },
    {
        timestamps: true,

        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                delete ret.salt;
            }
        }
    }
);
//HOOK
Admin.pre<any>('save', async function (next) {
    // if(this.isModified("password")){
    try {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
    } catch (e) {
        next(e);
    }
    //}
    next();
});
Admin.methods.checkPassword = async function (textPassword) {
    //.methods called on instance
    console.log('PASSWORD', this.password);
    const hashed = await bcrypt.hash(textPassword, this.salt);
    console.log('SALT', this.salt);
    console.log('Hashed', hashed);
    return hashed == this.password;
};

export interface AdminDocument extends Document, AdminSchema {
    checkPassword(textPassword: string): boolean;
}
export default model<AdminDocument>('Admin', Admin);
