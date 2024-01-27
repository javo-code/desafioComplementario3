import { Router } from "express";
import CartController from "../controllers/cart.controllers.js";

const router = Router();
const controller = new CartController();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

router.post("/:idCart/products/:idProd", controller.addProdToCart);

router.delete("/:idCart/products/:idProd", controller.removeProdToCart);

router.put("/:idCart/products/:idProd", controller.updateQuantity);

router.delete("/:id", controller.delete);

export default router;
