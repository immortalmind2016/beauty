import express from "express";
import { getLogger } from "@npm-immortal-user/utils";
import user from "./route/user.route";
import admin from "./route/admin.route";
import product from "./route/product.route";
import settings from "./route/settings.route";
import cart from "./route/cart.route";
import post from "./route/post.route";

import config from "./config";
import bodyParser from "body-parser";
import "./utils/sendgrid";
import { connect } from "mongoose";
connect(config.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const app = express();
app.use(bodyParser.json());

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
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );

  next();
});
app.use("/api/user", user);
app.use("/api/admin", admin);
app.use("/api/cart", cart);
app.use("/api/product", product);
app.use("/api/settings", settings);
app.use("/api/post", post);

const PORT = process.env.PORT || 5000;
//const logger = getLogger('server', 'info');
//logger.info('Application will start');
app.listen(PORT, () => {
  // logger.info('Application started on port ' + PORT);
});
