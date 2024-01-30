//-------------------📌MONGO
import * as ProductDaoMongo from '../dao/mongoDB/products/product.dao.js'
import * as UserDaoMongo from '../dao/mongoDB/users/user.dao.js'
import * as CartDaoMongo from '../dao/mongoDB/cart/cart.dao.js'

//-------------------📌FS
import * as ProductDaoFS from '../dao/fileSystem/products.dao.js'
import * as UserDaoFS from '../dao/fileSystem/users.dao.js'
import * as CartDaoFS from '../dao/fileSystem/carts.dao.js'

import "dotenv/config.js"
import { initMongoDB } from "../config/connection.js";

let userDao;
let prodDao;
let cartDao;
let persistence = process.argv[3];

switch (persistence) {
    case 'FS':
        userDao = UserDaoFS;
        prodDao = ProductDaoFS;
        cartDao = CartDaoFS;
        console.log(persistence);
        break;
    case 'MONGO':
        await initMongoDB();
        userDao = UserDaoMongo
        prodDao = ProductDaoMongo;
        cartDao = CartDaoMongo;
        console.log(persistence);
        break;
    default:  
        userDao = UserDaoFS;
        prodDao = ProductDaoFS;
        cartDao = CartDaoFS;
        persistence = 'FS'
        console.log(persistence);
        break; 
};

export default { prodDao, userDao, cartDao };