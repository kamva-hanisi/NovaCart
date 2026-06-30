import { Router } from "express";
import { AuthController } from "./auth.controller.js";

const router = Router();

const controller = new AuthController();

router.get("/health", controller.health);

router.post("/register", controller.register.bind(controller));

export default router;
