import express from "express";
import { json } from "body-parser";
import cors from "cors";
import * as path from "path";
import { userRoutes } from "./routes/user";
import { projectRoutes } from "./routes/project";
import { freelancerRoutes } from "./routes/freelancer";
import { authRoutes } from "./routes/auth";

const app = express();
// only for production use
app.use(express.static(path.join(__dirname, "../client/dist")));

app.set("trust proxy", true);
app.use(json({ limit: "5mb" }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/freelancers", freelancerRoutes);
app.use("/api/auth", authRoutes);

// only for production use
app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/dist/index.html"));
});

app.all("*", async (req, res) => {
  res.send({ message: "Page not found" });
});

export { app };
