import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';
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
enum UserType {
    USER = 0,
    DOCTOR = 1,
    INFLUENCER = 2
}
const User: Schema = new Schema<UserSchema>(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: {
            type: Boolean,
            default: UserType.USER,
            required: true
        },
        isVerfied: {
            type: Boolean,
            default: 0
        },
        isFacebook: {
            type: Boolean,
            default: 0
        },
        salt: String
    },
    { timestamps: true }
);
//HOOK
User.pre<any>('save', async function (next) {
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
User.methods.checkPassword = async function (textPassword) {
    //.methods called on instance
    console.log('PASSWORD', this.password);
    const hashed = await bcrypt.hash(textPassword, this.salt);
    console.log('SALT', this.salt);
    console.log('Hashed', hashed);
    return hashed == this.password;
};
export interface UserDocument extends Document {
    checkPassword(textPassword: string): boolean;
}
export default model('User', User);
