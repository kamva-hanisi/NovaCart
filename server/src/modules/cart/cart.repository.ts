import { pool } from "../../config/database.js";

export class CartRepository {
  async findCartByUser(userId: number) {
    const [rows]: any = await pool.query(
      `
      SELECT * FROM carts
      WHERE user_id=?
      LIMIT 1
      `,
      [userId]
    );

    return rows[0] ?? null;
  }

  async createCart(userId: number) {
    const [result]: any = await pool.query(
      `
      INSERT INTO carts(user_id)
      VALUES(?)
      `,
      [userId]
    );

    return result.insertId;
  }

  async findCartItems(userId: number) {
    const [rows]: any = await pool.query(
      `
      SELECT
        ci.id,
        ci.product_id,
        p.name AS product_name,
        p.slug AS product_slug,
        p.thumbnail,
        ci.quantity,
        ci.unit_price,
        (ci.quantity * ci.unit_price) AS subtotal
      FROM carts c
      JOIN cart_items ci ON ci.cart_id = c.id
      JOIN products p ON p.id = ci.product_id
      WHERE c.user_id=?
      ORDER BY ci.created_at DESC
      `,
      [userId]
    );

    return rows;
  }

  async findItem(cartId: number, productId: number) {
    const [rows]: any = await pool.query(
      `
      SELECT *
      FROM cart_items

      WHERE cart_id=?
      AND product_id=?

      LIMIT 1
      `,
      [cartId, productId]
    );

    return rows[0] ?? null;
  }

  async findItemById(userId: number, id: number) {
    const [rows]: any = await pool.query(
      `
      SELECT ci.*
      FROM carts c
      JOIN cart_items ci ON ci.cart_id = c.id
      WHERE c.user_id=?
      AND ci.id=?
      LIMIT 1
      `,
      [userId, id]
    );

    return rows[0] ?? null;
  }

  async findItemByProductId(userId: number, productId: number) {
    const [rows]: any = await pool.query(
      `
      SELECT ci.*
      FROM carts c
      JOIN cart_items ci ON ci.cart_id = c.id
      WHERE c.user_id=?
      AND ci.product_id=?
      LIMIT 1
      `,
      [userId, productId]
    );

    return rows[0] ?? null;
  }

  async addItem(cartId: number, productId: number, quantity: number, price: number) {
    await pool.query(
      `
      INSERT INTO cart_items
      (
      cart_id,
      product_id,
      quantity,
      unit_price
      )

      VALUES (?, ?, ?, ?)
      `,
      [cartId, productId, quantity, price]
    );
  }

  async updateQuantity(id: number, quantity: number) {
    await pool.query(
      `
      UPDATE cart_items

      SET quantity=?

      WHERE id=?
      `,
      [quantity, id]
    );
  }

  async increase(userId: number, id: number) {
    const [result]: any = await pool.query(
      `
      UPDATE cart_items ci
      JOIN carts c ON c.id = ci.cart_id
      SET ci.quantity = ci.quantity + 1
      WHERE c.user_id=?
      AND ci.id=?
      `,
      [userId, id]
    );

    return result.affectedRows > 0;
  }

  async decrease(userId: number, id: number) {
    const [result]: any = await pool.query(
      `
      UPDATE cart_items ci
      JOIN carts c ON c.id = ci.cart_id
      SET ci.quantity = ci.quantity - 1
      WHERE c.user_id=?
      AND ci.id=?
      `,
      [userId, id]
    );

    return result.affectedRows > 0;
  }

  async remove(userId: number, id: number) {
    const [result]: any = await pool.query(
      `
      DELETE ci
      FROM cart_items ci
      JOIN carts c ON c.id = ci.cart_id
      WHERE c.user_id=?
      AND ci.id=?
      `,
      [userId, id]
    );

    return result.affectedRows > 0;
  }
}
