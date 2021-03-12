import faker, { fake, random } from "faker";
import Product, { ProductSchema, RecommonedType } from "../model/Product";
import Settings, { SettingType } from "../model/Settings";
import { connect } from "mongoose";
import config from "../config";
connect(config.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });

const categories = [];
const products = [];
const brands = [];
const homeSlider = [];
let counter = 0;
while (counter != 5) {
  const category: { name: String; image: String } = {
    name: faker.commerce.department(),
    image: faker.image.imageUrl().replace("http", "https"),
  };

  let brand = {
    name: faker.company.companyName(),
    image: faker.image.imageUrl().replace("http", "https"),
  };
  if (
    brands.findIndex((_brand) => _brand.name == brand.name) > -1 ||
    categories.findIndex((_cat) => _cat.name == category.name) > -1
  ) {
    console.log("REPEAT");
    continue;
  } else {
    counter++;
  }
  homeSlider.push({ image: faker.image.imageUrl().replace("http", "https") });
  brands.push(brand);
  categories.push(category);

  const sliderImages = [
    faker.image.imageUrl().replace("http", "https"),
    faker.image.imageUrl().replace("http", "https"),
    faker.image.imageUrl().replace("http", "https"),
    faker.image.imageUrl().replace("http", "https"),
  ];
  const product: ProductSchema = {
    brand,
    category,
    image: faker.image.imageUrl().replace("http", "https"),
    //@ts-ignore
    isRecommended: faker.random.boolean(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    rates: Math.floor(Number(Math.random() * 5)),
    sliderImages,
  };
  products.push(product);
}

(async () => {
  await Product.insertMany(products);
  let cat: any = {
    name: SettingType.CATEGORIES,
    categories,
  };
  let bran: {
    name: SettingType;
    brands: any[];
  } = { name: SettingType.BRANDS, brands };
  let slider: {
    name: SettingType;
    homeSlider: any[];
  } = { name: SettingType.HOMESLIDER, homeSlider };
  console.log("START GENERATOR");
  try {
    await Promise.all([
      Settings.findOneAndUpdate({ name: SettingType.CATEGORIES }, cat, {
        upsert: true,
      }),
      Settings.findOneAndUpdate({ name: SettingType.BRANDS }, bran, {
        upsert: true,
      }),
      Settings.findOneAndUpdate({ name: SettingType.HOMESLIDER }, slider, {
        upsert: true,
      }),
    ]);
  } catch (e) {
    console.log(e);
  }
  console.log("END GENERATOR");
})();
