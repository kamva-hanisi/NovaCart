export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string | undefined;
}

export interface LoginDto {
  email: string;
  password: string;
}
