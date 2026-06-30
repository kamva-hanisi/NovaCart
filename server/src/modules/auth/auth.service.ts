import bcrypt from "bcrypt";
import { AuthRepository } from "./auth.repository.js";
import type { RegisterUserDto } from "./auth.types.js";
import { AppError } from "../../common/errors/AppError.js";
import { generateToken } from "../../common/utils/jwt.js";

export class AuthService {
  constructor(private repository = new AuthRepository()) {}

  async register(data: RegisterUserDto) {
    const existingUser = await this.repository.findUserByEmail(data.email);

    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const createUserPayload: any = {
      role_id: 10, // Customer role
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password_hash: hashedPassword,
    };

    if (data.phone) {
      createUserPayload.phone = data.phone;
    }

    const id = await this.repository.createUser(createUserPayload);

    return {
      id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };
  }

  async login(email: string, password: string) {
    const user = await this.repository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken({
      id: user.id,
      role: user.role_id,
    });

    return {
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    };
  }

  async me(id: number) {
    return this.repository.findUserById(id);
  }
}
