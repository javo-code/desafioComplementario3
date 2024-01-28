// cart.router.js
import { Router } from "express";
import CartController from "../controllers/cart.controllers.js";
import * as ticketController from '../controllers/ticket.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();
const controller = new CartController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/:idCart/products/:idProd", controller.addProdToCart);
router.delete("/:idCart/products/:idProd", controller.removeProdToCart);
router.put("/:idCart/products/:idProd", controller.updateProdQuantityToCart);
router.delete("/:id", controller.clearCart);

router.post('/:cartId/purchase', verifyToken, ticketController.generateTicket);

export default router;
