import MongoDao from "../mongo.dao.js";
import { CartModel } from "./cart.model.js";

export default class CartMongoDao extends MongoDao {
  constructor() {
    super(CartModel);
  }
}
