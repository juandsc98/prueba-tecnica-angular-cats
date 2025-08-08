import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  // Transición de login/register a páginas protegidas
  transition('login => *', [
    query(':enter', [
      style({ 
        opacity: 0,
        transform: 'translateX(100%)'
      })
    ], { optional: true }),
    
    query(':leave', [
      style({ 
        opacity: 1,
        transform: 'translateX(0)'
      }),
      animate('200ms ease-out', style({ 
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ], { optional: true }),
    
    query(':enter', [
      animate('300ms ease-out', style({ 
        opacity: 1,
        transform: 'translateX(0)'
      }))
    ], { optional: true })
  ]),
  
  // Transición de register a páginas protegidas
  transition('register => *', [
    query(':enter', [
      style({ 
        opacity: 0,
        transform: 'translateX(100%)'
      })
    ], { optional: true }),
    
    query(':leave', [
      style({ 
        opacity: 1,
        transform: 'translateX(0)'
      }),
      animate('200ms ease-out', style({ 
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ], { optional: true }),
    
    query(':enter', [
      animate('300ms ease-out', style({ 
        opacity: 1,
        transform: 'translateX(0)'
      }))
    ], { optional: true })
  ]),
  
  // Transición por defecto (fade suave)
  transition('* <=> *', [
    query(':enter', [
      style({ 
        opacity: 0,
        transform: 'translateY(20px)'
      })
    ], { optional: true }),
    
    query(':leave', [
      style({ 
        opacity: 1,
        transform: 'translateY(0)'
      }),
      animate('200ms ease-out', style({ 
        opacity: 0,
        transform: 'translateY(-20px)'
      }))
    ], { optional: true }),
    
    query(':enter', [
      animate('300ms ease-out', style({ 
        opacity: 1,
        transform: 'translateY(0)'
      }))
    ], { optional: true })
  ])
]);

// Animación alternativa con fade suave
export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({ 
        opacity: 0,
        transform: 'scale(0.95)'
      })
    ], { optional: true }),
    
    query(':leave', [
      style({ 
        opacity: 1,
        transform: 'scale(1)'
      }),
      animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ 
        opacity: 0,
        transform: 'scale(1.05)'
      }))
    ], { optional: true }),
    
    query(':enter', [
      animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ 
        opacity: 1,
        transform: 'scale(1)'
      }))
    ], { optional: true })
  ])
]);

// Animación con slide vertical
export const slideAnimation = trigger('slideAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(50px)'
      })
    ], { optional: true }),
    
    query(':leave', [
      style({
        opacity: 1,
        transform: 'translateY(0)'
      })
    ], { optional: true }),
    
    group([
      query(':leave', [
        animate('250ms ease-out', style({
          opacity: 0,
          transform: 'translateY(-50px)'
        }))
      ], { optional: true }),
      
      query(':enter', [
        animate('300ms ease-out', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ], { optional: true })
    ])
  ])
]);

// Nueva animación con línea de progreso
export const progressLineAnimation = trigger('progressLineAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({ 
        opacity: 0,
        transform: 'translateY(20px)'
      })
    ], { optional: true }),
    
    query(':leave', [
      style({ 
        opacity: 1,
        transform: 'translateY(0)'
      }),
      animate('200ms ease-out', style({ 
        opacity: 0,
        transform: 'translateY(-20px)'
      }))
    ], { optional: true }),
    
    query(':enter', [
      animate('300ms ease-out', style({ 
        opacity: 1,
        transform: 'translateY(0)'
      }))
    ], { optional: true })
  ])
]);
