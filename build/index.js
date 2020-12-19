"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./route/user.route"));
const admin_route_1 = __importDefault(require("./route/admin.route"));
const product_route_1 = __importDefault(require("./route/product.route"));
const settings_route_1 = __importDefault(require("./route/settings.route"));
const config_1 = __importDefault(require("./config"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./utils/sendgrid");
const mongoose_1 = require("mongoose");
mongoose_1.connect(config_1.default.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use('/api/user', user_route_1.default);
app.use('/api/admin', admin_route_1.default);
app.use('/api/product', product_route_1.default);
app.use('/api/settings', settings_route_1.default);
const PORT = process.env.PORT || 5000;
//const logger = getLogger('server', 'info');
//logger.info('Application will start');
app.listen(PORT, () => {
    // logger.info('Application started on port ' + PORT);
});
//# sourceMappingURL=index.js.map