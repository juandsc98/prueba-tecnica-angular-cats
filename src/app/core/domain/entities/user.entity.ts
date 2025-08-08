export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  edad: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  edad: number;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}
