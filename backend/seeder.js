const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");
const db = require("./config/db");

dotenv.config();

db();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const allProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(allProducts);

    console.log("Data Imported!!!");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Deleted!!!");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
