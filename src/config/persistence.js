import ProductFSDao from "../dao/fileSystem/products.dao.js";
import CartFSDao from "../dao/fileSystem/carts.dao.js";
import UserFSDao from "../dao/fileSystem/users.dao.js";

import ProductMongoDao from "../dao/mongoDB/products/product.dao.js";
import CartMongoDao from "../dao/mongoDB/cart/cart.dao.js";
import UserMongoDao from "../dao/mongoDB/users/user.dao.js";

import "dotenv/config"
import { initMongoDB } from "./connection.js";

let cartDao;
let prodDao;
let userDao;

const persistence = process.argv[3];

switch (persistence) {
    case "FS":
        userDao = new UserFSDao("../dao/fileSystem/users.json");
        prodDao = new ProductFSDao("../dao/fileSystem/porducts.json");
        cartDao = new CartFSDao ("../dao/fileSystem/carts.json");
        console.log("📚 La PERSISTENCIA actual es => ", persistence);
        break;
    case "MONGO":
        await initMongoDB();
        userDao = new UserMongoDao();
        prodDao = new ProductMongoDao();
        cartDao = new CartMongoDao();
        console.log("📚 La PERSISTENCIA actual es => ", persistence);
        break;

    default:
        await initMongoDB();
        userDao = new ProductMongoDao();
        prodDao = new CartMongoDao();
        cartDao = new UserMongoDao();
        console.log(persistence);
        break;
}

export default { prodDao, cartDao, userDao}