import { ProductRepository } from "./product.repository.js";
import { AppError } from "../../common/errors/AppError.js";
import type { CreateProductDto, ProductQuery } from "./product.types.js";

export class ProductService {
  constructor(private repository = new ProductRepository()) {}

  async create(data: CreateProductDto) {
    const id = await this.repository.create(data);

    return {
      id,

      ...data,
    };
  }

  async getAll(query: ProductQuery) {
    return this.repository.findAll(query);
  }

  async getById(id: number) {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }
}
