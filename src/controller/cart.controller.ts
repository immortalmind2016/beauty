import { getLogger } from '@npm-immortal-user/utils/module';
import { RequestHandler } from 'express';
import { logger } from '../utils/logger';
import Cart from '../model/Cart';
const showCart: RequestHandler = async (req, res, err) => {
    try {
        const { _id }: { _id: string } = req.user as { _id: string };

        const cart = await Cart.findOne({ user: _id }).populate(
            'products.product',
            'name image price'
        );
        res.json({ cart });
    } catch (e) {
        logger.error(e?.message);
        res.status(501).json({ error: e?.message });
    }
};
const addProduct: RequestHandler = async (req, res, err) => {
    try {
        const { _id }: { _id: string } = req.user as { _id: string };
        const { products } = req.body;
        const cart = await Cart.findOneAndUpdate(
            { user: _id },
            {
                $set: {
                    products
                }
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
