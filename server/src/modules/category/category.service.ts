import { CategoryRepository } from "./category.repository.js";
import { AppError } from "../../common/errors/AppError.js";
import type { CreateCategoryDto } from "./category.types.js";

export class CategoryService {
  constructor(private repository = new CategoryRepository()) {}

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: number) {
    const category = await this.repository.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  }

  async create(data: CreateCategoryDto) {
    const id = await this.repository.create(data);

    return {
      id,
      ...data,
    };
  }
}
