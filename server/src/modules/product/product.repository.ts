import { pool } from "../../config/database.js";
import type { CreateProductDto, ProductQuery } from "./product.types.js";

export class ProductRepository {
  async create(product: CreateProductDto) {
    const [result]: any = await pool.query(
      `
      INSERT INTO products
      (
      category_id,
      brand_id,
      name,
      slug,
      sku,
      short_description,
      description,
      price,
      sale_price,
      stock_quantity,
      thumbnail,
      is_featured,
      status
      )

      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        product.category_id,
        product.brand_id,
        product.name,
        product.slug,
        product.sku,
        product.short_description ?? null,
        product.description ?? null,
        product.price,
        product.sale_price ?? null,
        product.stock_quantity,
        product.thumbnail ?? null,
        product.is_featured ?? false,
        product.status ?? "DRAFT",
      ]
    );

    return result.insertId;
  }

  async findAll(query: ProductQuery) {
    let sql = `
      SELECT
        p.*,
        c.name AS category_name,
        b.name AS brand_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN brands b ON p.brand_id = b.id
      WHERE 1=1
    `;

    const values: any[] = [];

    if (query.search) {
      sql += " AND p.name LIKE ?";
      values.push(`%${query.search}%`);
    }

    if (query.category) {
      sql += " AND p.category_id = ?";
      values.push(query.category);
    }

    if (query.brand) {
      sql += " AND p.brand_id = ?";
      values.push(query.brand);
    }

    if (query.featured) {
      sql += " AND p.is_featured = true";
    }

    if (query.minPrice) {
      sql += " AND p.price >= ?";
      values.push(query.minPrice);
    }

    if (query.maxPrice) {
      sql += " AND p.price <= ?";
      values.push(query.maxPrice);
    }

    switch (query.sort) {
      case "price_asc":
        sql += " ORDER BY p.price ASC";
        break;

      case "price_desc":
        sql += " ORDER BY p.price DESC";
        break;

      case "oldest":
        sql += " ORDER BY p.created_at ASC";
        break;

      case "name":
        sql += " ORDER BY p.name ASC";
        break;

      default:
        sql += " ORDER BY p.created_at DESC";
    }

    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 12);
    const offset = (page - 1) * limit;

    sql += " LIMIT ? OFFSET ?";
    values.push(limit, offset);

    const [rows]: any = await pool.query(sql, values);

    return rows;
  }

  async findById(id: number) {
    const [rows]: any = await pool.query(
      `
      SELECT
      p.*,
      c.name AS category_name,
      b.name AS brand_name

      FROM products p

      JOIN categories c
      ON p.category_id=c.id

      JOIN brands b
      ON p.brand_id=b.id

      WHERE p.id=?

      LIMIT 1
      `,
      [id]
    );

    return rows[0] ?? null;
  }

  async findPrice(id: number) {
    const [rows]: any = await pool.query(
      `
    SELECT id, price

    FROM products

    WHERE id=?

    LIMIT 1
    `,
      [id]
    );

    return rows[0] ?? null;
  }
}
