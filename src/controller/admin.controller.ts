import { getLogger } from "@npm-immortal-user/utils/module";
import { Request, RequestHandler } from "express";
import Admin, { AdminSchema, AdminDocument } from "../model/Admin";
import Jwt from "jsonwebtoken";
import { sendMessage } from "../utils/sendgrid";
import config from "../config";
import { json } from "body-parser";
import path from "path";
import { logger } from "../utils/logger";
const signUp: RequestHandler = async (req: Request, res, err) => {
  try {
    const { name, email, password, type } = req.body as AdminSchema;
    const newUser: AdminSchema = { name, email, password, type };
    const user: any = await new Admin(newUser).save();
    logger.info(`New admin registered with email ${email}`);
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
    const user: AdminDocument = await Admin.findOne({ email });
    if (user) {
      if (user.checkPassword(password)) {
        const jwt = await Jwt.sign(
          {
            _id: user.id,
            email: user.email,
            name: user.name,
          },
          config.JWT_SECRET
        );
        logger.info(`success login as admin with email ${email} `);

        return res.json({ access_token: jwt });
      }
    }
    logger.warn(`failed to login as admin with email ${email} `);
    return res.status(401).json({ error: "User not found" });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const getUserData: RequestHandler = async (req, res, err) => {
  try {
    const { _id } = req.user as { _id: string };
    const user = await Admin.findOne({ _id });
    if (!user) return res.status(401).json({ error: "User not found" });

    return res.json({ user });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};

export { signUp, login, getUserData };
