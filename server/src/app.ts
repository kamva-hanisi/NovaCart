import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";

import routes from "./routes/index.js";
import { errorHandler } from "./common/middleware/errorHandler.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/v1", routes);

// Error Handler (must be last)
app.use(errorHandler);

app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "NovaCart API is running 🚀",
  });
});

export default app;
