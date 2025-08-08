import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthApiService } from '../../../core/infrastructure/services/auth-api.service';
import { User } from '../../../core/domain/entities/user.entity';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent],
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Obtener el usuario desde el almacenamiento local
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser) {
      this.isLoading = false;
      this.user = currentUser;
    } else {
      this.isLoading = false;
      this.errorMessage = 'No se encontró información del usuario. Por favor, inicia sesión nuevamente.';
      // Redirigir al login si no hay usuario
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }

  goToCats(): void {
    this.router.navigate(['/cats']);
  }

  goToCatsTable(): void {
    this.router.navigate(['/cats-table']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
