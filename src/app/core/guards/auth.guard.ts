import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthApiService } from '../infrastructure/services/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthApiService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    // Verificar directamente el estado de autenticación
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (isAuthenticated) {
      return of(true);
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
