import express from "express";
import { addProject } from "../controllers/projects/addProject";
import { getProjects } from "../controllers/projects/getProjects";
import { updateProjectStatus } from "../controllers/projects/updateProjectStatus";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getProjects);
router.post("/", authMiddleware, addProject);
router.put("/:id/status_update", authMiddleware, updateProjectStatus);

export { router as projectRoutes };
