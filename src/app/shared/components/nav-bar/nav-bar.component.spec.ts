import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './nav-bar.component';
import { AuthApiService } from '../../../core/infrastructure/services/auth-api.service';
import { User } from '../../../core/domain/entities/user.entity';
import { BehaviorSubject, of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let authService: jasmine.SpyObj<AuthApiService>;

  const mockUser: User = {
    id: '1',
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '123456789',
    edad: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthApiService', [
      'isAuthenticated',
      'getCurrentUser',
      'getToken',
      'logout'
    ], {
      isAuthenticated$: new BehaviorSubject<boolean>(false)
    });

    await TestBed.configureTestingModule({
      imports: [NavBarComponent, RouterTestingModule],
      providers: [
        { provide: AuthApiService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthApiService) as jasmine.SpyObj<AuthApiService>;
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  describe('inicialización', () => {
    it('debería inicializar con valores por defecto', () => {
      expect(component.isAuthenticated).toBe(false);
      expect(component.currentUser).toBeNull();
      expect(component.isMobileMenuOpen).toBe(false);
    });

    it('debería verificar el estado de autenticación al inicializar', () => {
      authService.getToken.and.returnValue('mock-token');
      authService.getCurrentUser.and.returnValue(mockUser);

      component.ngOnInit();

      expect(authService.getToken).toHaveBeenCalled();
      expect(authService.getCurrentUser).toHaveBeenCalled();
      expect(component.isAuthenticated).toBe(true);
      expect(component.currentUser).toEqual(mockUser);
    });
  });

  describe('mobile menu', () => {
    it('should toggle mobile menu', () => {
      expect(component.isMobileMenuOpen).toBe(false);

      component.toggleMobileMenu();
      expect(component.isMobileMenuOpen).toBe(true);

      component.toggleMobileMenu();
      expect(component.isMobileMenuOpen).toBe(false);
    });

    it('should close mobile menu', () => {
      component.isMobileMenuOpen = true;
      
      component.closeMobileMenu();
      
      expect(component.isMobileMenuOpen).toBe(false);
    });
  });

  describe('logout', () => {
    it('should call auth service logout and navigate', () => {
      spyOn(component['router'], 'navigate');
      
      component.logout();
      
      expect(authService.logout).toHaveBeenCalled();
      expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
      expect(component.isMobileMenuOpen).toBe(false);
    });
  });

  describe('template rendering', () => {
    it('should show login/register links when not authenticated', () => {
      component.isAuthenticated = false;
      component.currentUser = null;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Iniciar Sesión');
      expect(compiled.textContent).toContain('Registrarse');
    });

    it('should show user info and logout when authenticated', () => {
      component.isAuthenticated = true;
      component.currentUser = mockUser;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('juan@example.com');
      expect(compiled.textContent).toContain('Cerrar Sesión');
    });

    it('should show mobile menu when toggled', () => {
      component.isMobileMenuOpen = true;
      fixture.detectChanges();

      const mobileMenu = fixture.nativeElement.querySelector('#mobile-menu');
      expect(mobileMenu).toBeTruthy();
      expect(mobileMenu.classList.contains('hidden')).toBe(false);
    });

    it('should hide mobile menu by default', () => {
      component.isMobileMenuOpen = false;
      fixture.detectChanges();

      const mobileMenu = fixture.nativeElement.querySelector('#mobile-menu');
      expect(mobileMenu).toBeTruthy();
      expect(mobileMenu.classList.contains('hidden')).toBe(true);
    });
  });

  describe('navigation links', () => {
    it('should show cats links when authenticated', () => {
      component.isAuthenticated = true;
      component.currentUser = mockUser;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Lista de razas');
      expect(compiled.textContent).toContain('Tabla');
    });

    it('should not show cats links when not authenticated', () => {
      component.isAuthenticated = false;
      component.currentUser = null;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.textContent).not.toContain('Lista de razas');
      expect(compiled.textContent).not.toContain('Tabla');
    });
  });

  describe('auth state changes', () => {
    it('should update component state when auth state changes', () => {
      const authSubject = new BehaviorSubject<boolean>(false);
      authService.isAuthenticated$ = authSubject.asObservable();
      authService.getToken.and.returnValue('mock-token');
      authService.getCurrentUser.and.returnValue(mockUser);

      component.ngOnInit();

      // Simular cambio de estado de autenticación
      authSubject.next(true);

      expect(component.isAuthenticated).toBe(true);
      expect(component.currentUser).toEqual(mockUser);
    });
  });
});
