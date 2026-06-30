import { pool } from "../../config/database.js";
import type { CreateCategoryDto } from "./category.types.js";

export class CategoryRepository {
  async findAll() {
    const [rows]: any = await pool.query("SELECT * FROM categories ORDER BY name ASC");

    return rows;
  }

  async findById(id: number) {
    const [rows]: any = await pool.query("SELECT * FROM categories WHERE id = ? LIMIT 1", [id]);

    return rows[0] ?? null;
  }

  async create(category: CreateCategoryDto) {
    const [result]: any = await pool.query(
      `
      INSERT INTO categories
      (name, slug, description, image)
      VALUES (?, ?, ?, ?)
      `,
      [category.name, category.slug, category.description ?? null, category.image ?? null]
    );

    return result.insertId;
  }
}
