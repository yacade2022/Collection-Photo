import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controllers/auth.js";
import {
  validationRegister,
  validationLogin,
} from "../middelware/validationMiddelware.js";

router.route("/register").post(validationRegister, register);
router.route("/login").post(validationLogin, login);
router.route("/logout").get(logout);
export default router;
