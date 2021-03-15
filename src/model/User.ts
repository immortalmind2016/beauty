import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";
export interface UserSchema {
  name: String;
  phone: String;
  email: String;
  password: String;
  image?: string;
  type?: UserType;
  isVerfied?: Boolean;
  isFacebook?: Boolean;
  salt?: String;
  createdAt?: String;
  updatedAt?: String;
}
export enum UserType {
  USER = 0,
  DOCTOR = 1,
  INFLUENCER = 2,
}
const User: Schema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    type: {
      type: Number,
      default: UserType.USER,
      required: true,
    },
    isVerfied: {
      type: Boolean,
      default: 0,
    },
    isFacebook: {
      type: Boolean,
      default: 0,
    },
    salt: String,
  },
  {
    timestamps: true,

    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.salt;
      },
    },
  }
);
//HOOK
User.pre<any>("save", async function (next) {
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
  console.log("PASSWORD", this.password);
  const hashed = await bcrypt.hash(textPassword, this.salt);
  console.log("SALT", this.salt);
  console.log("Hashed", hashed);
  return hashed == this.password;
};

export interface UserDocument extends Document, UserSchema {
  checkPassword(textPassword: string): boolean;
}
export default model<UserDocument>("User", User);
