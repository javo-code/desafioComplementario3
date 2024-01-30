import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeAdmin, authorizeUser } from "../middlewares/authRol.js";
import UserCntroller from "../controllers/user.controller.js"

const router = Router();
const controller = new UserCntroller();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

router.post("/register", controller.register);

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

router.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
              console.error("Error closing session:", err);
              throw new Error("The session couldn't be destroyed la sesión");
            }
              console.log('Sesión de usuario destruida con éxito.');
              res.redirect('/login');
        });
    } catch (error) {
        console.error('Error al destruir la sesión:', error);
        return res.status(500).send('Error al cerrar sesión');
    }
});

export default router;
