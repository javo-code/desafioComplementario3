import Services from "./class.services.js";
import CartMongoDao from "../dao/mongoDB/cart/cart.dao.js";
const cartDao = new CartMongoDao();

export default class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  async addProdToCart(cartId, prodId) {
    try {
      const existCart = await getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return false;
      const existProd = await prodDao.getById(prodId);
      console.log("existProd-->", existProd);
      if (!existProd) return false;
      const existProdInCart = existCart.products.find((p) => p.product._id.toString() === prodId.toString());
      if (existProdInCart) {
        existProdInCart.quantity++;
        existCart.save();
        return existProdInCart;
      } else {
        return await cartDao.addProdToCart(existCart, prodId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async removeProdInCart(cartId, prodId) {
    try {
      const existCart = await getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return false;
  
      const existProd = existCart.products.find((p) => p.product._id.toString() === prodId.toString());
      console.log("existProd-->", existProd);
      if (!existProd) return false;
  
      return await cartDao.removeProdToCart(existCart, existProd);
    } catch (error) {
      console.log(error);
    }
  };

  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      const existCart = await getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return false;
  
      const existProd = existCart.products.find((p) => p.product._id.toString() === prodId.toString());
      console.log("existProd-->", existProd);
      if (!existProd) return false;
  
      return await cartDao.updateProdQuantityToCart(existCart, existProd, quantity);
    } catch (error) {
      console.log(error);
    }
  };

  async clearCart(cartId) {
    try {
      const existCart = await getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return false;

      return await cartDao.clearCart(existCart);
    } catch (error) {
      console.log(error);
    }
  };
}
