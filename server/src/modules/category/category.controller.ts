import type { Request, Response } from "express";
import { CategoryService } from "./category.service.js";
import { createCategorySchema } from "./category.validation.js";
import { AppError } from "../../common/errors/AppError.js";

const service = new CategoryService();

export class CategoryController {
  async getAll(_req: Request, res: Response) {
    const categories = await service.getAll();

    res.json({
      success: true,
      data: categories,
    });
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("Invalid category id", 400);
    }

    const category = await service.getById(id);

    res.json({
      success: true,
      data: category,
    });
  }

  async create(req: Request, res: Response) {
    const data = createCategorySchema.parse(req.body);

    const category = await service.create(data);

    res.status(201).json({
      success: true,
      message: "Category created",
      data: category,
    });
  }
}
