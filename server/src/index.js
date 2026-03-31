import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";
import announcementRoutes from "./routes/announcement_route.js";
import certificateRoutes from "./routes/cert_request_route.js";
import cors from "cors";

import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/announcement", announcementRoutes);
app.use("/api/v1/certificate", certificateRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
  });
};

startServer();
