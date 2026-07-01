import { pool } from "../../config/database.js";
import type { CreateBrandDto } from "./brand.types.js";

export class BrandRepository {
  async findAll() {
    const [rows]: any = await pool.query("SELECT * FROM brands ORDER BY name ASC");

    return rows;
  }

  async findById(id: number) {
    const [rows]: any = await pool.query("SELECT * FROM brands WHERE id = ? LIMIT 1", [id]);

    return rows[0] ?? null;
  }

  async create(brand: CreateBrandDto) {
    const [result]: any = await pool.query(
      `
      INSERT INTO brands
      (name, slug, description, logo, website)
      VALUES (?, ?, ?, ?, ?)
      `,
      [brand.name, brand.slug, brand.description ?? null, brand.logo ?? null, brand.website ?? null]
    );

    return result.insertId;
  }
}
