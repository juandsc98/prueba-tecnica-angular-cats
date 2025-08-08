import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthApiService } from '../infrastructure/services/auth-api.service';

@Component({
  selector: 'app-initializer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Inicializando aplicación...</p>
      </div>
    </div>
  `,
  styles: []
})
export class AppInitializerComponent implements OnInit {
  constructor(
    private authService: AuthApiService,
    private router: Router
  ) {}

            ngOnInit(): void {
            // Suscribirse al estado de autenticación
            this.authService.isAuthenticated$.subscribe(isAuthenticated => {
              if (isAuthenticated) {
                this.router.navigate(['/profile'], { replaceUrl: true });
              } else {
                this.router.navigate(['/login'], { replaceUrl: true });
              }
            });
          }
}
