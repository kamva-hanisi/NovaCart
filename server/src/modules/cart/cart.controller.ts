import type { Response } from "express";

import type { AuthRequest } from "../../common/middleware/auth.middleware.js";

import { CartService } from "./cart.service.js";

import { addToCartSchema } from "./cart.validation.js";
import { AppError } from "../../common/errors/AppError.js";

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

  private getItemId(req: AuthRequest) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("Invalid cart item id", 400);
    }

    return id;
  }

  async increase(req: AuthRequest, res: Response) {
    await service.increase(req.user!.id, this.getItemId(req));

    res.json({
      success: true,

      message: "Quantity increased",
    });
  }

  async decrease(req: AuthRequest, res: Response) {
    await service.decrease(req.user!.id, this.getItemId(req));

    res.json({
      success: true,

      message: "Quantity decreased",
    });
  }

  async remove(req: AuthRequest, res: Response) {
    await service.remove(req.user!.id, this.getItemId(req));

    res.json({
      success: true,

      message: "Item removed",
    });
  }
}
