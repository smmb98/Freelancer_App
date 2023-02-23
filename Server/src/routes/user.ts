import express from "express";
import { getUser } from "../controllers/users/getUser";
import { updateUser } from "../controllers/users/updateUser";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getUser);
router.put("/", authMiddleware, updateUser);

export { router as userRoutes };
