import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { LoginUseCase } from '../../../core/domain/usecases/login.usecase';
import { LoginRequest } from '../../../core/domain/entities/user.entity';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AuthApiService } from '../../../core/infrastructure/services/auth-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginUseCase: LoginUseCase,
    private router: Router,
    private authService: AuthApiService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials: LoginRequest = this.loginForm.value;

      this.loginUseCase.execute(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          
          if (response.success && response.data?.token) {
            // Forzar actualización del estado de autenticación
            this.authService.refreshAuthState();
            
            // Navegar inmediatamente
            this.router.navigate(['/profile'], { replaceUrl: true });
          } else {
            this.errorMessage = 'Respuesta inesperada del servidor. Por favor, intenta de nuevo.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          
          if (error.status === 0) {
            this.errorMessage = 'No se puede conectar con el servidor. Verifica que el backend esté ejecutándose.';
          } else if (error.status === 401) {
            this.errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
          } else if (error.status === 500) {
            this.errorMessage = 'Error interno del servidor. Por favor, intenta más tarde.';
          } else {
            this.errorMessage = error.error?.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.';
          }
        }
      });
    } else if (this.isLoading) {
      // Login en progreso, ignorando click
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
