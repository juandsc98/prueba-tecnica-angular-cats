import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, timeout, catchError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { User, AuthResponse, LoginRequest, RegisterRequest, ProfileResponse } from '../../domain/entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements IAuthRepository {
  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'current_user';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar estado inicial de autenticación
    this.checkInitialAuthState();
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    });
  }

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, credentials, {
      headers: this.getHeaders()
    }).pipe(
      tap(response => {
        if (response.success) {
          this.setToken(response.data.token);
          this.setUser(response.data.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

            login(credentials: LoginRequest): Observable<AuthResponse> {
            return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials, {
              headers: this.getHeaders()
            }).pipe(
              timeout(10000), // 10 segundos de timeout
              tap(response => {
                if (response.success && response.data?.token) {
                  this.setToken(response.data.token);
                  this.setUser(response.data.user);
                  
                  // Forzar actualización del estado de autenticación
                  this.isAuthenticatedSubject.next(true);
                  
                  // Verificar que el estado se actualizó correctamente
                  setTimeout(() => {
                    const currentState = this.isAuthenticated();
                    
                    // Forzar otra actualización para asegurar que todos los componentes se enteren
                    this.isAuthenticatedSubject.next(currentState);
                  }, 100);
                }
              }),
              catchError(this.handleError.bind(this))
            );
          }

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.baseUrl}/auth/profile`, {
      headers: this.getHeaders()
    });
  }

  logout(): void {
    this.removeToken();
    this.removeUser();
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

            // Método para forzar actualización del estado
          refreshAuthState(): void {
            const isAuthenticated = this.isAuthenticated();
            this.isAuthenticatedSubject.next(isAuthenticated);
          }

            private checkInitialAuthState(): void {
            const token = this.getToken();
            const user = this.getCurrentUser();
            const isAuthenticated = !!(token && user);
            
            this.isAuthenticatedSubject.next(isAuthenticated);
          }

            private handleError(error: HttpErrorResponse): Observable<never> {
            let errorMessage = 'Error desconocido';
            
            if (error.error instanceof ErrorEvent) {
              // Error del cliente
              errorMessage = `Error de red: ${error.error.message}`;
            } else {
              // Error del servidor
              switch (error.status) {
                case 0:
                  errorMessage = 'No se puede conectar con el servidor';
                  break;
                case 400:
                  errorMessage = 'Datos de entrada inválidos';
                  break;
                case 401:
                  errorMessage = 'Credenciales incorrectas';
                  break;
                case 404:
                  errorMessage = 'Endpoint no encontrado';
                  break;
                case 500:
                  errorMessage = 'Error interno del servidor';
                  break;
                default:
                  errorMessage = `Error ${error.status}: ${error.message}`;
              }
            }
            
            return throwError(() => new Error(errorMessage));
          }
}
