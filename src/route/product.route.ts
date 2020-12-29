import express from "express";
import { signUp, login, getUserData } from "../controller/admin.controller";
import PassportJwt from "../auth/PassportJwt";
import {
  create,
  deleteOne,
  edit,
  getAll,
  getOne,
  addProductToUser,
  getUserProducts,
} from "../controller/product.controller";
import { UserType } from "../model/User";
const router = express.Router();
//PassportJwt.authenticate(['user-rule', 'admin-rule'], { session: false })
router.get("/page/:page", getAll);

router.patch(
  "/",
  PassportJwt.authenticate("admin-rule", { session: false }),
  edit
);
router.delete(
  "/:productId",
  PassportJwt.authenticate("admin-rule", { session: false }),
  deleteOne
);
router.post(
  "/",
  PassportJwt.authenticate("admin-rule", { session: false }),
  create
);
router.post(
  "/assign",
  PassportJwt.authenticate("user-rule", { session: false }),
  addProductToUser
);
router.get(
  "/user/:userId",

  getUserProducts
);
router.get(
  "/:productId",

  getOne
);
export default router;
