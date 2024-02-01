import ProductFSDao from "./fileSystem/products.dao.js";
import CartFSDao from "./fileSystem/carts.dao.js";
import UserFSDao from "./fileSystem/users.dao.js";
import TicketFSDao from "./fileSystem/ticket.dao.js";

import ProductMongoDao from "./mongoDB/products/product.dao.js";
import CartMongoDao from "./mongoDB/cart/cart.dao.js";
import UserMongoDao from "./mongoDB/users/user.dao.js";
import TicketMongoDao from "./mongoDB/ticket/ticket.dao.js";

import "dotenv/config"
import { initMongoDB } from "../../config/connection.js";

let cartDao;
let prodDao;
let userDao;
let ticket;

const persistence = process.argv[3];

switch (persistence) {
    case "FS":
        userDao = new UserFSDao("../daos/fileSystem/users.json");
        prodDao = new ProductFSDao("../daos/fileSystem/porducts.json");
        cartDao = new CartFSDao ("../daos/fileSystem/carts.json");
        ticket= new TicketMongoDao ("../daos/mongoDB/ticket/ticket.dao.js")
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