import Services from "./class.services.js";
import persistence from "../config/persistence.js";
const { prodDao } = persistence;

export default class ProductService extends Services {
  constructor() {
    super(prodDao);
  }
}