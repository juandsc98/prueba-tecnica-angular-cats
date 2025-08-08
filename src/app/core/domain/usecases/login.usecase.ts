import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AuthResponse, LoginRequest } from '../entities/user.entity';
import { AUTH_REPOSITORY_TOKEN } from '../../infrastructure/providers';

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  constructor(@Inject(AUTH_REPOSITORY_TOKEN) private authRepository: IAuthRepository) {}

  execute(credentials: LoginRequest): Observable<AuthResponse> {
    return this.authRepository.login(credentials);
  }
}
