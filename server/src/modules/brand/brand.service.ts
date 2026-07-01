import { BrandRepository } from "./brand.repository.js";
import { AppError } from "../../common/errors/AppError.js";
import type { CreateBrandDto } from "./brand.types.js";

export class BrandService {
  constructor(private repository = new BrandRepository()) {}

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: number) {
    const brand = await this.repository.findById(id);

    if (!brand) {
      throw new AppError("Brand not found", 404);
    }

    return brand;
  }

  async create(data: CreateBrandDto) {
    const id = await this.repository.create(data);

    return {
      id,
      ...data,
    };
  }
}
