import express from "express";
import { upload } from "../controller/services.controller";
import PassportJwt from "../auth/PassportJwt";
const router = express.Router();
import path from "path";
import multer from "multer";
const uploader = (type, ext) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(
        null,
        path.join(__dirname, "..", "..", "public", `uploads`, `${type}`)
      );
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ext);
    },
  });
  return multer({ storage });
};

router.post(
  "/user-image",
  ///PassportJwt.authenticate(["user-rule", "admin-rule"], { session: false }),
  uploader("users", ".png").single("image"),
  upload("users", ".png")
);
router.post(
  "/product-image",
  ///PassportJwt.authenticate(["user-rule", "admin-rule"], { session: false }),
  uploader("products", ".png").single("image"),
  upload("products", ".png")
);

export default router;
