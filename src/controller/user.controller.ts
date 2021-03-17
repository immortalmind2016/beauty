import { getLogger } from "@npm-immortal-user/utils/module";
import { Request, RequestHandler } from "express";
import User, { UserSchema, UserDocument, UserType } from "../model/User";
import Jwt from "jsonwebtoken";
import { sendMessage } from "../utils/sendgrid";
import config from "../config";
import { json } from "body-parser";
import path from "path";
import { logger } from "../utils/logger";
const signUp: RequestHandler = async (req: Request, res, err) => {
  try {
    const { name, email, password, phone, type } = req.body as UserSchema;
    const newUser: UserSchema = { name, email, password, phone, type };
    const user: any = await new User(newUser).save();
    const emailToken = Jwt.sign(
      {
        email,
        _id: user._id,
      },
      config.JWT_SECRET
    );
    let emailSent = false;
    while (!emailSent) {
      try {
        await sendMessage(
          email,
          `${config.URL}user/verify-email?token=${emailToken}`,
          user.name
        );

        logger.info(`Verficiation Email sent to ${email}`);
        emailSent = true;
      } catch (e) {
        console.log(e);
        console.log(e?.response?.body?.errors);
      }
    }

    res.status(200).json({ success: true });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
interface LoginType {
  email: string;
  password: string;
}
const login: RequestHandler = async (req, res, err) => {
  try {
    const { email, password }: LoginType = req.body as LoginType;
    const user: UserDocument = await User.findOne({ email });
    if (user) {
      const isSamePassword = await user.checkPassword(password);
      if (isSamePassword && user.isVerfied) {
        const jwt = await Jwt.sign(
          {
            _id: user.id,
            email: user.email,
            name: user.name,
            type: user.type,
          },
          config.JWT_SECRET
        );
        return res.json({ access_token: jwt });
      } else if (isSamePassword && !user.isVerfied) {
        return res.status(401).json({ error: "Email is not verified" });
      }
    }

    return res.status(401).json({ error: "User not found" });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const getUserData: RequestHandler = async (req, res, err) => {
  try {
    const { _id } = req.user as { _id: string };
    const user = await User.findOne({ _id });
    if (!user) return res.status(401).json({ error: "User not found" });

    return res.json({ user });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const updateUser: RequestHandler = async (req, res, err) => {
  try {
    const { _id } = req.user as { _id: string };
    const user = await User.findOne({ _id });
    const data = req.body;
    if (!user) return res.status(401).json({ error: "User not found" });

    return res.json({
      user: await User.findOneAndUpdate({ _id }, { ...data }, { new: true }),
    });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const getProfiles: RequestHandler = async (req, res, err) => {
  try {
    const users = await User.find({
      $or: [{ type: UserType.INFLUENCER }, { type: UserType.DOCTOR }],
    });

    return res.json({ users });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const verifyEmail: RequestHandler = async (req, res, err) => {
  try {
    let token;
    token = req.query.token;
    type data = { email?: string };
    console.log(req.query);
    const data: data = Jwt.verify(token, config.JWT_SECRET) as data;
    await User.findOneAndUpdate(
      { email: data.email },
      { $set: { isVerfied: true } },
      {}
    );
    res.sendFile(path.join(__dirname, "../../view/verify.html"));
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
export { signUp, login, getUserData, verifyEmail, getProfiles, updateUser };
