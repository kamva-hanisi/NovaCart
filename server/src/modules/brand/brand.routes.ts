import { Router } from "express";
import { BrandController } from "./brand.controller.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { authorize } from "../../common/middleware/role.middleware.js";
import { asyncHandler } from "../../common/middleware/asyncHandler.js";

const router = Router();
const controller = new BrandController();

router.get("/", asyncHandler(controller.getAll.bind(controller)));

router.get("/:id", asyncHandler(controller.getById.bind(controller)));

router.post("/", authenticate, authorize(1), asyncHandler(controller.create.bind(controller)));

export default router;
