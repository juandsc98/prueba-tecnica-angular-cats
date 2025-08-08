import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { ProfileResponse } from '../entities/user.entity';
import { AUTH_REPOSITORY_TOKEN } from '../../infrastructure/providers';

@Injectable({
  providedIn: 'root'
})
export class GetProfileUseCase {
  constructor(@Inject(AUTH_REPOSITORY_TOKEN) private authRepository: IAuthRepository) {}

  execute(): Observable<ProfileResponse> {
    return this.authRepository.getProfile();
  }
}
