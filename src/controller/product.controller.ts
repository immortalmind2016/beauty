import { getLogger } from "@npm-immortal-user/utils/module";
import { Request, RequestHandler, Response } from "express";
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
import Review from "../model/Review";
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
    let products = [];
    let results = [];
    if (req.query.searchBy) {
      let filter: Filter = {
        value: req.query?.value as string,
        searchBy: req.query?.searchBy as string,
      };

      let filters = { [filter.searchBy]: filter.value };
      let catBrandFlters = {};
      if (req.query.category) {
        //@ts-ignore
        filters = { ...filters, ["category.name"]: req.query.category };
        catBrandFlters = {
          ...catBrandFlters,
          ["category.name"]: req.query.category,
        };
      }
      if (req.query.brand) {
        //@ts-ignore
        filters = { ...filters, ["brand.name"]: req.query.brand };
        catBrandFlters = {
          ...catBrandFlters,
          ["category.name"]: req.query.brand,
        };
      }
      results = await Promise.all([
        await Product.find(filters).limit(limit).skip(skip),
        Product.find(catBrandFlters).count(),
      ]);
    } else {
      let filters = {};
      if (req.query.category) {
        //@ts-ignore
        filters = { ...filters, ["category.name"]: req.query.category };
      }
      if (req.query.brand) {
        //@ts-ignore
        filters = { ...filters, ["brand.name"]: req.query.category };
      }
      results = await Promise.all([
        Product.find(filters).limit(limit).skip(skip),
        Product.find(filters).count(),
      ]);
    }
    products = results[0];
    let reviews;
    reviews = await Review.find({
      product: { $in: products.map((product) => product._id) },
    });
    reviews = reviews.reduce((acc, current) => {
      return {
        ...acc,
        [current._id]: current,
      };
    }, {});
    console.log(reviews);
    products = products.map((product) => {
      return {
        ...product,
        review: reviews[product._id],
      };
    });
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
const reviewProduct: RequestHandler = async (
  req: Request,
  res: Response,
  err
) => {
  try {
    new Review({
      product: req.params.productId,
      ...req.body,
    }).save((err) => {
      if (err) {
        logger.error(err?.message);
        return res.status(501).json({ error: err?.message });
      }

      res.json({ success: true });
    });
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
  reviewProduct,
};
