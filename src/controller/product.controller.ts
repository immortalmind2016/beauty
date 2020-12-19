import { getLogger } from '@npm-immortal-user/utils/module';
import { RequestHandler } from 'express';
import Product, { ProductSchema } from '../model/Product';
const logger = getLogger('product', 'info');
const create: RequestHandler = async (req, res, err) => {
    try {
        const {
            brand,
            categorie,
            name,
            description,
            image,
            price,
            sliderImages
        }: ProductSchema = req.body;
        const newProduct: ProductSchema = {
            brand,
            categorie,
            name,
            description,
            image,
            price,
            sliderImages
        };
        const product = await new Product(newProduct);
        product.save();
        res.json({ product });
    } catch (e) {
        logger.error(e?.message);
        res.status(501).json({ error: e?.message });
    }
};
const deleteOne: RequestHandler = async (req, res, err) => {
    try {
        await Product.deleteOne({ _id: req.body._id });
        res.json({ sucess: true });
    } catch (e) {
        logger.error(e?.message);
        res.status(501).json({ error: e?.message });
    }
};
const edit: RequestHandler = async (req, res, err) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.body._id },
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
        const product = await Product.findOne({ _id: req.body._id });
        res.json({ product });
    } catch (e) {
        logger.error(e?.message);
        res.status(501).json({ error: e?.message });
    }
};
const getAll: RequestHandler = async (req, res, err) => {
    try {
        const products = await Product.find();
        res.json({ products });
    } catch (e) {
        logger.error(e?.message);
        res.status(501).json({ error: e?.message });
    }
};

export { create, deleteOne, edit, getOne, getAll };
