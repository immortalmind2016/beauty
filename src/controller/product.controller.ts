import { getLogger } from "@npm-immortal-user/utils/module";
import { RequestHandler } from "express";
import { Types } from "mongoose";
import config from "../config";
import { UserReq } from "../auth/PassportJwt";
import Product, {
  ProductDocument,
  ProductSchema,
  RecommonedType,
} from "../model/Product";
import UserProduct from "../model/UserProduct";
import { logger } from "../utils/logger";
const create: RequestHandler = async (req, res, err) => {
  try {
    const {
      brand,
      category,
      name,
      description,
      image,
      price,
      sliderImages,
      isRecommended,
    }: ProductSchema = req.body;
    const newProduct: ProductSchema = {
      brand,
      category,
      name,
      description,
      image,
      price,
      sliderImages,
      isRecommended,
    };
    const product = await Product.create(newProduct);
    res.json({ product });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const deleteOne: RequestHandler = async (req, res, err) => {
  try {
    await Product.deleteOne({ _id: req.params.productId });
    res.json({ sucess: true });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const edit: RequestHandler = async (req, res, err) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.body.id },
      { ...req.body },
      { new: true }
    );
    res.json({ sucess: true });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const getOne: RequestHandler = async (req, res, err) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    res.json({ product });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
interface Filter {
  searchBy: string;
  value: string;
}
const getAll: RequestHandler = async (req, res, err) => {
  try {
    const { page } = req.params;
    const limit = config.webLimit;
    const skip = Number(page) * limit;
    let products = {};
    let results = [];
    if (req.query.searchBy) {
      let filter: Filter = {
        value: req.query?.value as string,
        searchBy: req.query?.searchBy as string,
      };
      let filters = { [filter.searchBy]: filter.value };
      results = await Promise.all([
        await Product.find(filters).limit(limit).skip(skip),
        Product.find().count(),
      ]);
    } else {
      results = await Promise.all([
        Product.find().limit(limit).skip(skip),
        Product.find().count(),
      ]);
    }
    products = results[0];

    res.json({ products, totalResults: results[1], limit });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const addProductToUser: RequestHandler = async (req: any, res, err) => {
  try {
    const { _id }: { _id: string } = req.user as { _id: string };

    await UserProduct.create({
      user: Types.ObjectId(req.user._id),
      product: Types.ObjectId(req.body.productId),
    });
    return res.json({ success: true });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const getUserProducts: RequestHandler = async (req: any, res, err) => {
  try {
    const products = await UserProduct.find({
      user: req.params.userId,
    }).populate("product");
    res.json({ products });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
export {
  create,
  deleteOne,
  edit,
  getOne,
  getAll,
  addProductToUser,
  getUserProducts,
};
