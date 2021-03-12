import { getLogger } from "@npm-immortal-user/utils/module";
import { request, RequestHandler } from "express";
import Product, { RecommonedType } from "../model/Product";
import Settings from "../model/Settings";
import { logger } from "../utils/logger";
const setSettings: RequestHandler = async (req, res, err) => {
  try {
    const { name } = req.body;
    console.log({
      ...(name.toLowerCase() == "categories"
        ? {
            $addToSet: { categories: { $each: req.body.categories } },
          }
        : { ...req.body }),
    });

    const setting = await Settings.findOneAndUpdate(
      { name },
      {
        ...req.body,
      },
      { upsert: true, new: true }
    );
    res.json({ success: true });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const getSettings: RequestHandler = async (req, res, err) => {
  try {
    const { name } = req.params;
    console.log("NAME ", name);

    const setting = await Settings.findOne({ name: name?.toLocaleUpperCase() });
    res.json({ [name]: setting });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const homePage: RequestHandler = async (req, res, err) => {
  let promiseArray;
  promiseArray = [
    Settings.find({
      $or: [{ name: "CATEGORIES" }, { name: "BRANDS" }, { name: "HOMESLIDER" }],
    }),
    Product.find(
      { isRecommended: RecommonedType.YES },
      "description name price _id image"
    ).limit(5),
  ];
  try {
    let results: any[][] = await Promise.all(promiseArray);
    console.log(results);
    let categories = results[0]?.filter((setting) => {
      return setting.name == "CATEGORIES";
    })[0]?.categories;
    let brands = results[0]?.filter((setting) => {
      return setting.name == "BRANDS";
    })[0]?.brands;
    let homeSlider = results[0]?.filter((setting) => {
      return setting.name == "HOMESLIDER";
    })[0]?.homeSlider;
    let recommended = results[1];
    res.json({
      categories,
      brands,
      homeSlider,
      recommended,
    });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
export { setSettings, getSettings, homePage };
