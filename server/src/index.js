import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";
import announcementRoutes from "./routes/announcement_route.js";
import certificateRoutes from "./routes/cert_request_route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", announcementRoutes);
app.use("/api/v1", certificateRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
  });
};

startServer();
