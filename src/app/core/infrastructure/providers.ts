import { Provider, InjectionToken } from '@angular/core';
import { ICatRepository } from '../domain/repositories/cat.repository';
import { CatApiService } from './services/cat-api.service';
import { IAuthRepository } from '../domain/repositories/auth.repository';
import { AuthApiService } from './services/auth-api.service';

// Crear tokens de inyección
export const CAT_REPOSITORY_TOKEN = new InjectionToken<ICatRepository>('ICatRepository');
export const AUTH_REPOSITORY_TOKEN = new InjectionToken<IAuthRepository>('IAuthRepository');

export const CORE_PROVIDERS: Provider[] = [
  {
    provide: CAT_REPOSITORY_TOKEN,
    useClass: CatApiService
  },
  {
    provide: AUTH_REPOSITORY_TOKEN,
    useClass: AuthApiService
  }
];
