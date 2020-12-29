import { connect } from "mongoose";
import config from "../config";
connect(config.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
import Product from "../model/Product";

(async () => {
  try {
    console.log("Start cleaning db");
    await Product.deleteMany();
    console.log("Db cleaned");
  } catch (e) {
    console.log(e);
  }
})();
