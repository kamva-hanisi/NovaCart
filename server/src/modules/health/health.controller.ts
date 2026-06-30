import type { Request, Response } from "express";
import { pool } from "../../config/database.js";

export const healthCheck = async (_req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();

    await connection.query("SELECT 1");

    connection.release();

    res.status(200).json({
      success: true,
      message: "NovaCart API is healthy",
      database: "Connected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};