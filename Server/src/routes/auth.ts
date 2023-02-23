import express from "express";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";
import { register } from "../controllers/auth/register";

const router = express.Router();

router.post("/register", register); //for registering a new user
router.post("/login", login); // for logging in a user and generating an authentication token
router.get("/logout", logout); // for logging out a user and invalidating the authentication token

export { router as authRoutes };
