import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthApiService } from '../infrastructure/services/auth-api.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthApiService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthApiService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthApiService) as jasmine.SpyObj<AuthApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('debería retornar true cuando el usuario está autenticado', () => {
      authService.isAuthenticated.and.returnValue(true);

      guard.canActivate().subscribe(result => {
        expect(result).toBe(true);
        expect(authService.isAuthenticated).toHaveBeenCalled();
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });

    it('debería redirigir al login y retornar false cuando el usuario no está autenticado', () => {
      authService.isAuthenticated.and.returnValue(false);

      guard.canActivate().subscribe(result => {
        expect(result).toBe(false);
        expect(authService.isAuthenticated).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      });
    });
  });
});
