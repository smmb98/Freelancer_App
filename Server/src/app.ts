import express from "express";
import { json } from "body-parser";
import cors from "cors";
import * as path from "path";
import { userRoutes } from "./routes/user";
import { projectRoutes } from "./routes/project";
import { freelancerRoutes } from "./routes/freelancer";
import { authRoutes } from "./routes/auth";

const app = express();
app.use(express.static(path.join(path.__dirname, "../client/build")));

app.set("trust proxy", true);
app.use(json({ limit: "5mb" }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/freelancers", freelancerRoutes);
app.use("/auth", authRoutes);

app.get("*", async (req, res) => {
  res.sendFile(path.join(path.__dirname + "/../client/build/index.html"));
});

app.all("*", async (req, res) => {
  res.send("Page not found");
});

export { app };
