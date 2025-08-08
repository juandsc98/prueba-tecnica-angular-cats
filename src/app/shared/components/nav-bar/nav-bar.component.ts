import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthApiService } from '../../../core/infrastructure/services/auth-api.service';
import { User } from '../../../core/domain/entities/user.entity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styles: []
})
export class NavBarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  currentUser: User | null = null;
  isMobileMenuOpen = false;
  private authSubscription: Subscription | null = null;

  constructor(
    private authService: AuthApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar estado inicial inmediatamente
    this.checkAuthState();
    
    // Suscribirse a cambios de estado
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.checkAuthState();
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private checkAuthState(): void {
    // Verificar directamente el estado de autenticación
    const token = this.authService.getToken();
    const user = this.authService.getCurrentUser();
    
    this.isAuthenticated = !!(token && user);
    this.currentUser = user;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.checkAuthState();
    this.closeMobileMenu();
    this.router.navigate(['/login']);
  }
}
