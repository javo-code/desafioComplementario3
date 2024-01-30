import ProductFSDao from "../dao/fileSystem/products.dao.js";
import CartFSDao from "../dao/fileSystem/carts.dao.js";
import UserFSDao from "../dao/fileSystem/users.dao.js";
import TicketFSDao from "../dao/fileSystem/ticket.dao.js";

import ProductMongoDao from "../dao/mongoDB/products/product.dao.js";
import CartMongoDao from "../dao/mongoDB/cart/cart.dao.js";
import UserMongoDao from "../dao/mongoDB/users/user.dao.js";
import TicketMongoDao from "../dao/mongoDB/ticket/ticket.dao.js";

import "dotenv/config"
import { initMongoDB } from "./connection.js";

let cartDao;
let prodDao;
let userDao;
let ticket;

const persistence = process.argv[3];

switch (persistence) {
    case "FS":
        userDao = new UserFSDao("../dao/fileSystem/users.json");
        prodDao = new ProductFSDao("../dao/fileSystem/porducts.json");
        cartDao = new CartFSDao ("../dao/fileSystem/carts.json");
        ticket= new TicketMongoDao ("../dao/mongoDB/ticket/ticket.dao.js")
        console.log("📚 La PERSISTENCIA actual es => ", persistence);
        break;
    case "MONGO":
        await initMongoDB();
        userDao = new UserMongoDao();
        prodDao = new ProductMongoDao();
        cartDao = new CartMongoDao();
        ticket = new TicketMongoDao();
        console.log("📚 La PERSISTENCIA actual es => ", persistence);
        break;

    default:
        await initMongoDB();
        userDao = new ProductMongoDao();
        prodDao = new CartMongoDao();
        cartDao = new UserMongoDao();
        ticket = new TicketMongoDao();
        console.log("📚 PERSISTENCIA por defecto => ",persistence);
        break;
}

export default { prodDao, cartDao, userDao}