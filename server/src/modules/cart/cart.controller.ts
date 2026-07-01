import type { Response } from "express";

import type { AuthRequest } from "../../common/middleware/auth.middleware.js";

import { CartService } from "./cart.service.js";

import { addToCartSchema } from "./cart.validation.js";

const service = new CartService();

export class CartController {
  async get(req: AuthRequest, res: Response) {
    const cart = await service.get(req.user!.id);

    res.json({
      success: true,
      data: cart,
    });
  }

  async add(req: AuthRequest, res: Response) {
    const data = addToCartSchema.parse(req.body);

    await service.add(req.user!.id, data.product_id, data.quantity);

    res.status(201).json({
      success: true,

      message: "Product added to cart",
    });
  }
}
