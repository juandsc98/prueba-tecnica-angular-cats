import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { RegisterUseCase } from '../../../core/domain/usecases/register.usecase';
import { RegisterRequest } from '../../../core/domain/entities/user.entity';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { SuccessMessageComponent } from '../../../shared/components/success-message/success-message.component';
import { AuthApiService } from '../../../core/infrastructure/services/auth-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showSuccessMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerUseCase: RegisterUseCase,
    private router: Router,
    private authService: AuthApiService
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required, Validators.minLength(8)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(120)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.showSuccessMessage = false;

      const credentials: RegisterRequest = this.registerForm.value;

      this.registerUseCase.execute(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            // Forzar actualización del estado de autenticación
            this.authService.refreshAuthState();
            
            // Mostrar mensaje de éxito
            this.showSuccessMessage = true;
            
            // Redirigir automáticamente después de 3 segundos
            setTimeout(() => {
              this.goToProfile();
            }, 3000);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error al registrar usuario. Por favor, intenta de nuevo.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
