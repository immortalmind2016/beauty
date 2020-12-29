import express from "express";
import {
  signUp,
  login,
  getUserData,
  verifyEmail,
} from "../controller/user.controller";
import PassportJwt from "../auth/PassportJwt";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get(
  "/",
  PassportJwt.authenticate("user-rule", { session: false }),
  getUserData
);
router.get("/verify-email", verifyEmail);
export default router;
