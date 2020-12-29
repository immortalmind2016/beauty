import express from "express";
import {
  getSettings,
  setSettings,
  homePage,
} from "../controller/settings.controller";
import PassportJwt from "../auth/PassportJwt";
const router = express.Router();

router.post(
  "/",
  PassportJwt.authenticate("admin-rule", { session: false }),
  setSettings
);
router.get("/homepage", homePage);

router.get(
  "/:name",
  PassportJwt.authenticate("admin-rule", { session: false }),
  getSettings
);

export default router;
