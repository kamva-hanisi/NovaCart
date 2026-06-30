import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { registerSchema } from "./auth.validation.js";
import { successResponse, errorResponse } from "../../common/utils/apiResponse.js";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);

      const user = await authService.register(data);

      return res.status(201).json(successResponse(user, "User registered successfully"));
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(errorResponse(error.message));
      }

      return res.status(500).json(errorResponse("Internal server error"));
    }
  }

  health(_req: Request, res: Response) {
    res.json({
      success: true,
      message: "Authentication module ready",
    });
  }
}
