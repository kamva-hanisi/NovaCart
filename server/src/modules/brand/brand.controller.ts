import type { Request, Response } from "express";
import { BrandService } from "./brand.service.js";
import { createBrandSchema } from "./brand.validation.js";
import { AppError } from "../../common/errors/AppError.js";

const service = new BrandService();

export class BrandController {
  async getAll(_req: Request, res: Response) {
    const brands = await service.getAll();

    res.json({
      success: true,
      data: brands,
    });
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("Invalid brand id", 400);
    }

    const brand = await service.getById(id);

    res.json({
      success: true,
      data: brand,
    });
  }

  async create(req: Request, res: Response) {
    const data = createBrandSchema.parse(req.body);

    const brand = await service.create(data);

    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: brand,
    });
  }
}
