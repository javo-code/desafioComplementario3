import { Router } from "express";
import ProdController from "../controllers/product.controllers.js";

const router = Router();
const controller = new ProdController();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;
