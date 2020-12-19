import { getLogger } from '@npm-immortal-user/utils/module';
import { RequestHandler } from 'express';
import Settings from '../model/Settings';
const logger = getLogger('settingsController', 'info');
const setSettings: RequestHandler = async (req, res, err) => {
    try {
        const { name } = req.body;
        console.log({
            ...(name.toLowerCase() == 'categories'
                ? {
                      $addToSet: { categories: { $each: req.body.categories } }
                  }
                : { ...req.body })
        });

        const setting = await Settings.findOneAndUpdate(
            { name },
            {
                ...(name.toLowerCase() == 'categories'
                    ? {
                          $addToSet: { categories: { $each: req.body.categories } }
                      }
                    : { ...req.body })
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
        console.log('NAME ', name);

        const setting = await Settings.findOne({ name: name?.toLocaleUpperCase() });
        res.json({ [name]: setting });
    } catch (e) {
        logger.error(e?.message);
        res.status(501).json({ error: e?.message });
    }
};
export { setSettings, getSettings };
