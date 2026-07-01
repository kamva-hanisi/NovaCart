import type { Request, Response } from "express";
import { ProductService } from "./product.service.js";
import { createProductSchema } from "./product.validation.js";
import { AppError } from "../../common/errors/AppError.js";
import type { ProductQuery } from "./product.types.js";

const service = new ProductService();

export class ProductController {
  async create(req: Request, res: Response) {
    const data = createProductSchema.parse(req.body);

    const product = await service.create(data);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  }

  async getAll(req: Request, res: Response) {
    const query: ProductQuery = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 12,
    };

    if (typeof req.query.search === "string") {
      query.search = req.query.search;
    }

    if (req.query.category) {
      query.category = Number(req.query.category);
    }

    if (req.query.brand) {
      query.brand = Number(req.query.brand);
    }

    if (req.query.featured === "true") {
      query.featured = true;
    }

    if (req.query.minPrice) {
      query.minPrice = Number(req.query.minPrice);
    }

    if (req.query.maxPrice) {
      query.maxPrice = Number(req.query.maxPrice);
    }

    if (typeof req.query.sort === "string") {
      query.sort = req.query.sort;
    }

    const products = await service.getAll(query);

    res.json({
      success: true,
      data: products,
    });
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("Invalid product id", 400);
    }

    const product = await service.getById(id);

    res.json({
      success: true,
      data: product,
    });
  }
}
