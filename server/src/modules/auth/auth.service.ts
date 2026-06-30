import bcrypt from "bcrypt";
import { AuthRepository } from "./auth.repository.js";
import type { RegisterUserDto } from "./auth.types.js";

export class AuthService {
  constructor(private repository = new AuthRepository()) {}

  async register(data: RegisterUserDto) {
    const existingUser = await this.repository.findUserByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
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
}
