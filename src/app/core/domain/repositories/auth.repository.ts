import { Observable } from 'rxjs';
import { User, AuthResponse, LoginRequest, RegisterRequest, ProfileResponse } from '../entities/user.entity';

export interface IAuthRepository {
  register(credentials: RegisterRequest): Observable<AuthResponse>;
  login(credentials: LoginRequest): Observable<AuthResponse>;
  getProfile(): Observable<ProfileResponse>;
  logout(): void;
  isAuthenticated(): boolean;
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
}
