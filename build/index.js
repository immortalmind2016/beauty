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
const cart_route_1 = __importDefault(require("./route/cart.route"));
const post_route_1 = __importDefault(require("./route/post.route"));
const services_route_1 = __importDefault(require("./route/services.route"));
const config_1 = __importDefault(require("./config"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./utils/sendgrid");
const mongoose_1 = require("mongoose");
mongoose_1.connect(config_1.default.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(express_1.default.static("public"));
app.use(function (req, res, next) {
    var allowedOrigins = [
        "https://8fib4t1ccaof.loclx.io",
        "https://25.24.10.197:3000/",
        "https://25.24.10.197:3000",
        "http://7oltshuotddi.loclx.io",
        "http://cb6ac17b.ngrok.io",
        "http://ae435531.ngrok.io",
        "http://localhost:5000",
        "http://4a011676.ngrok.io/",
        "http://93f52e7f.ngrok.io",
        "http://5d845a7f.ngrok.io",
        "http://490ea9cb.ngrok.io",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://localhost:3000",
        "http://5945f4bd.ngrok.io",
        "http://42249189.ngrok.io",
        "http://localhost:3001",
    ];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        //res.setHeader('Access-Control-Allow-Origin', origin);
        res.header("Access-Control-Allow-Origin", "*");
    }
    //      res.setHeader("Access-Control-Allow-Origin", "*");
    //res.setHeader("Access-Control-Allow-Origin", "");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET,DELETE,PUT,OPTIONS");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
app.use("/api/user", user_route_1.default);
app.use("/api/admin", admin_route_1.default);
app.use("/api/cart", cart_route_1.default);
app.use("/api/product", product_route_1.default);
app.use("/api/settings", settings_route_1.default);
app.use("/api/post", post_route_1.default);
app.use("/api/services", services_route_1.default);
const PORT = process.env.PORT || 5000;
//const logger = getLogger('server', 'info');
//logger.info('Application will start');
app.listen(PORT, () => {
    // logger.info('Application started on port ' + PORT);
});
//# sourceMappingURL=index.js.map