import fs from "fs";
import path from "path";
let ImagesPath = (type) =>
  path.join(__dirname, "..", "..", "public", `uploads`, `${type}`);

const products = fs.readdirSync(ImagesPath("products"));
const users = fs.readdirSync(ImagesPath("users"));

for (let file of products) {
  fs.unlink(`${ImagesPath("products")}/${file}`, () => {});
}

for (let file of users) {
  fs.unlink(`${ImagesPath("users")}/${file}`, () => {});
}
