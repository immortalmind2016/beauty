import express from 'express';
import { getLogger } from '@npm-immortal-user/utils';
import user from './route/user.route';
import admin from './route/admin.route';
import product from './route/product.route';
import settings from './route/settings.route';
import cart from './route/cart.route';

import config from './config';
import bodyParser from 'body-parser';
import './utils/sendgrid';
import { connect } from 'mongoose';
connect(config.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const app = express();
app.use(bodyParser.json());
app.use('/api/user', user);
app.use('/api/admin', admin);
app.use('/api/cart', cart);
app.use('/api/product', product);
app.use('/api/settings', settings);

const PORT = process.env.PORT || 5000;
//const logger = getLogger('server', 'info');
//logger.info('Application will start');
app.listen(PORT, () => {
    // logger.info('Application started on port ' + PORT);
});
