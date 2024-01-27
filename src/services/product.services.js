import Services from "./class.services.js";
import ProductMongoDao from "../dao/mongoDB/products/product.dao.js";
const prodDao = new ProductMongoDao();

export default class ProductService extends Services {
  constructor() {
    super(prodDao);
  }
}