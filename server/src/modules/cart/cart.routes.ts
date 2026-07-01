import { Router } from "express";

import { CartController } from "./cart.controller.js";

import { authenticate } from "../../common/middleware/auth.middleware.js";

import { asyncHandler } from "../../common/middleware/asyncHandler.js";

const router = Router();

const controller = new CartController();

router.get("/", authenticate, asyncHandler(controller.get.bind(controller)));

router.post("/", authenticate, asyncHandler(controller.add.bind(controller)));

router.post("/add", authenticate, asyncHandler(controller.add.bind(controller)));

router.patch(
  "/item/:id/increase",
  authenticate,
  asyncHandler(controller.increase.bind(controller))
);

router.patch(
  "/item/:id/decrease",
  authenticate,
  asyncHandler(controller.decrease.bind(controller))
);

router.delete("/item/:id", authenticate, asyncHandler(controller.remove.bind(controller)));

export default router;
