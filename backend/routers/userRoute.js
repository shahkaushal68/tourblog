import express from "express";
import { fetchAllUsers, getSingleUser } from "../controllers/userController.js";
import { authCheck, authCheckAndUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("", fetchAllUsers);
router.get("/:id", authCheck, authCheckAndUser, getSingleUser);

export default router;
