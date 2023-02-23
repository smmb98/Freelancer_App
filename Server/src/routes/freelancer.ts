import express from "express";
import { getFreelancersRequests } from "../controllers/freelancers/getFreelancersRequests";
import { freelancersJobComplete } from "../controllers/freelancers/freelancersJobComplete";
import { authMiddleware } from "../middlewares/authMiddleware";
import { applyFreelanceJob } from "../controllers/freelancers/applyFreelanceJob";

const router = express.Router();

router.get("/", authMiddleware, getFreelancersRequests);
router.put("/:id/complete_status", authMiddleware, freelancersJobComplete);
router.post("/job_apply", authMiddleware, applyFreelanceJob);

export { router as freelancerRoutes };
