import { getLogger } from "@npm-immortal-user/utils/module";
import { RequestHandler } from "express";
import { logger } from "../utils/logger";
import Cart from "../model/Cart";
const showCart: RequestHandler = async (req, res, err) => {
  try {
    const { _id }: { _id: string } = req.user as { _id: string };

    const cart: any = await Cart.findOne({ user: _id }).populate(
      "products.product"
    );
    console.log(
      "🚀 ~ file: cart.controller.ts ~ line 13 ~ constshowCart:RequestHandler= ~ cart",
      cart
    );
    const totalMoney = cart.products?.reduce((acc, newOne) => {
      return (
        acc.product.price * acc.count + newOne.product.price * newOne.count
      );
    });
    res.json({ cart, totalMoney });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};
const addProduct: RequestHandler = async (req, res, err) => {
  try {
    const { _id }: { _id: string } = req.user as { _id: string };
    let { products } = req.body;
    products = products.map((product) => ({
      ...product,
      product: product.productId,
    }));
    const cart = await Cart.findOneAndUpdate(
      { user: _id },
      {
        $set: {
          products,
        },
      },
      { new: true, upsert: true }
    );
    res.json({ cart });
  } catch (e) {
    logger.error(e?.message);
    res.status(501).json({ error: e?.message });
  }
};

export { showCart, addProduct };
