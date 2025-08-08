import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AuthResponse, RegisterRequest } from '../entities/user.entity';
import { AUTH_REPOSITORY_TOKEN } from '../../infrastructure/providers';

@Injectable({
  providedIn: 'root'
})
export class RegisterUseCase {
  constructor(@Inject(AUTH_REPOSITORY_TOKEN) private authRepository: IAuthRepository) {}

  execute(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.authRepository.register(credentials);
  }
}
