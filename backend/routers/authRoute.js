import express from "express";
const router = express.Router();
import {
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/authController.js";

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogout);

export default router;
