// cart.controller.js
import Controllers from "./class.controller.js";
import CartService from "../services/cart.services.js";
const cartService = new CartService();

export default class CartController extends Controllers {
  constructor() {
    super(cartService);
  }

  addProdToCart = async (req, res, next) => {
    try {
      const newItem = await this.service.addProdToCart(req.params.idCart, req.params.idProd);
      if (!newItem) {
        res.status(404).json({ error: "Error adding product to cart!" });
      } else {
        res.status(200).json(newItem);
      }
    } catch (error) {
      next(error.message);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const result = await this.service.removeProdToCart(req.params.idCart, req.params.idProd);
      if (!result) {
        res.status(404).json({ error: "Error removing product from cart!" });
      } else {
        res.status(200).json({ message: "Product removed from cart successfully!" });
      }
    } catch (error) {
      next(error.message);
    }
  };

  updateQuantity = async (req, res, next) => {
    try {
      const result = await this.service.updateProdQuantityToCart(
        req.params.idCart,
        req.params.idProd,
        req.body.quantity
      );
      if (!result) {
        res.status(404).json({ error: "Error updating product quantity in cart!" });
      } else {
        res.status(200).json({ message: "Product quantity updated in cart successfully!" });
      }
    } catch (error) {
      next(error.message);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const result = await this.service.clearCart(req.params.idCart);
      if (!result) {
        res.status(404).json({ error: "Error clearing the cart!" });
      } else {
        res.status(200).json({ message: "Cart cleared successfully!" });
      }
    } catch (error) {
      next(error.message);
    }
  };
}
