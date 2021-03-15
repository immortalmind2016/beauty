import express from "express";
import {
  signUp,
  login,
  getUserData,
  verifyEmail,
  getProfiles,
  updateUser,
} from "../controller/user.controller";
import PassportJwt from "../auth/PassportJwt";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/get-profiles", getProfiles);

router.get(
  "/",
  PassportJwt.authenticate("user-rule", { session: false }),
  getUserData
);
router.put(
  "/",
  PassportJwt.authenticate("user-rule", { session: false }),
  updateUser
);
router.get("/verify-email", verifyEmail);
export default router;
