import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { successResponse, errorResponse } from "../../common/utils/apiResponse.js";
import type { AuthRequest } from "../../common/middleware/auth.middleware.js";

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

  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);

      const result = await authService.login(data.email, data.password);

      return res.json(successResponse(result, "Login successful"));
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(errorResponse(error.message));
      }

      return res.status(500).json(errorResponse("Internal Server Error"));
    }
  }

  async me(req: AuthRequest, res: Response) {
    const user = await authService.me(req.user!.id);

    return res.json(successResponse(user, "User profile"));
  }
}
