import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import UserCntroller from "../controllers/user.controller.js"

const router = Router();
const controller = new UserCntroller();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

router.post("/register",  controller.register);

router.post("/login", controller.login);

router.get("/private", verifyToken, (req, res) => {
  const { first_name, last_name, email, role } = req.user;
  res.json({
    status: "success",
    userData: {
      first_name,
      last_name,
      email,
      role,
    },
  });
});

export default router;
