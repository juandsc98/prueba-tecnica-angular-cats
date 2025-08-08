import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { progressLineAnimation } from './animations/route-animations';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [progressLineAnimation]
})
export class App {
  protected readonly title = signal('prueba-frontend');
  animateProgressLine = false;

  constructor(private router: Router) {
    // Suscribirse a eventos de navegación para mostrar la línea de progreso
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Resetear y activar animación
      this.animateProgressLine = false;
      
      setTimeout(() => {
        this.animateProgressLine = true;
        
        // Resetear después de la animación
        setTimeout(() => {
          this.animateProgressLine = false;
        }, 600);
      }, 10);
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
