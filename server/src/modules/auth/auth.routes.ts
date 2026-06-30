import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { asyncHandler } from "../../common/middleware/asyncHandler.js";

const router = Router();

const controller = new AuthController();

router.get("/health", controller.health);

router.post("/register", asyncHandler(controller.register.bind(controller)));

router.post("/login", asyncHandler(controller.login.bind(controller)));

router.get("/me", authenticate, asyncHandler(controller.me.bind(controller)));

export default router;
