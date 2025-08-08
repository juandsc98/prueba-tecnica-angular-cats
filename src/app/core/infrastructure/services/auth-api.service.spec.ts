import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthApiService } from './auth-api.service';
import { LoginRequest, RegisterRequest, User } from '../../domain/entities/user.entity';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: '1',
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '123456789',
    edad: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockLoginRequest: LoginRequest = {
    email: 'juan@example.com',
    password: 'password123'
  };

  const mockRegisterRequest: RegisterRequest = {
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    password: 'password123',
    telefono: '123456789',
    edad: 25
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService]
    });
    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('debería hacer login exitosamente y almacenar token y usuario', () => {
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        data: {
          token: 'mock-jwt-token',
          user: mockUser
        }
      };

      service.login(mockLoginRequest).subscribe(response => {
        expect(response.success).toBe(mockResponse.success);
        expect(response.message).toBe(mockResponse.message);
        expect(response.data.token).toBe(mockResponse.data.token);
        expect(response.data.user.id).toBe(mockResponse.data.user.id);
        expect(response.data.user.email).toBe(mockResponse.data.user.email);
        expect(service.isAuthenticated()).toBe(true);
        expect(service.getToken()).toBe('mock-jwt-token');
      });

      const req = httpMock.expectOne('https://prueba-tecnica-backend-cats.onrender.com/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockLoginRequest);
      req.flush(mockResponse);
    });

    it('debería manejar errores de login', () => {
      const errorResponse = {
        success: false,
        message: 'Credenciales incorrectas'
      };

      service.login(mockLoginRequest).subscribe({
        next: () => fail('debería haber fallado'),
        error: (error) => {
          expect(error.message).toContain('Credenciales incorrectas');
        }
      });

      const req = httpMock.expectOne('https://prueba-tecnica-backend-cats.onrender.com/api/auth/login');
      req.flush(errorResponse, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('register', () => {
    it('debería registrar exitosamente', () => {
      const mockResponse = {
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          token: 'mock-jwt-token',
          user: mockUser
        }
      };

      service.register(mockRegisterRequest).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(service.isAuthenticated()).toBe(true);
      });

      const req = httpMock.expectOne('https://prueba-tecnica-backend-cats.onrender.com/api/auth/register');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRegisterRequest);
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('debería limpiar los datos de autenticación', () => {
      // Simular usuario logueado
      localStorage.setItem('auth_token', 'mock-token');
      localStorage.setItem('current_user', JSON.stringify(mockUser));

      service.logout();

      expect(service.isAuthenticated()).toBe(false);
      expect(service.getToken()).toBeNull();
      expect(service.getCurrentUser()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('debería retornar true cuando existe token y usuario', () => {
      localStorage.setItem('auth_token', 'mock-token');
      localStorage.setItem('current_user', JSON.stringify(mockUser));

      expect(service.isAuthenticated()).toBe(true);
    });

    it('debería retornar false cuando no existe token', () => {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('debería retornar false cuando no existe usuario', () => {
      localStorage.setItem('auth_token', 'mock-token');
      // No establecer current_user para simular que no existe
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('getProfile', () => {
    it('debería obtener el perfil del usuario exitosamente', () => {
      const mockResponse = {
        success: true,
        message: 'Perfil obtenido exitosamente',
        data: mockUser
      };

      service.getProfile().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://prueba-tecnica-backend-cats.onrender.com/api/auth/profile');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
