import express from "express";
import { signUp, login, getUserData } from "../controller/admin.controller";
import PassportJwt from "../auth/PassportJwt";
import {
  createPost,
  editPost,
  deletePost,
  getUserPosts,
} from "../controller/post.controller";
import { UserType } from "../model/User";
const router = express.Router();
//PassportJwt.authenticate(['user-rule', 'admin-rule'], { session: false })

router.post(
  "/",
  PassportJwt.authenticate("user-rule", { session: false }),
  createPost
);

export default router;
