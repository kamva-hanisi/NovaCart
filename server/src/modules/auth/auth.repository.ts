import { pool } from "../../config/database.js";

export class AuthRepository {
  async findUserByEmail(email: string) {
    const [rows]: any = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);

    return rows[0] ?? null;
  }

  async createUser(user: {
    role_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | undefined;
    password_hash: string;
  }) {
    const [result]: any = await pool.query(
      `
      INSERT INTO users
      (
        role_id,
        first_name,
        last_name,
        email,
        phone,
        password_hash
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        user.role_id,
        user.first_name,
        user.last_name,
        user.email,
        user.phone ?? null,
        user.password_hash,
      ]
    );

    return result.insertId;
  }

  async findUserById(id: number) {
    const [rows]: any = await pool.query(
      `
    SELECT
      id,
      first_name,
      last_name,
      email,
      phone,
      role_id,
      avatar,
      status,
      email_verified,
      created_at
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
      [id]
    );

    return rows[0] ?? null;
  }
}
