const router = require("express").Router();
import { loginController, registerController } from "../controller/auth";

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
