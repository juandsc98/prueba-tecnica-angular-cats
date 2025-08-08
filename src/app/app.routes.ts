import { Routes } from '@angular/router';
import { CatsListComponent } from './features/cats/cats-list/cats-list.component';
import { CatsTableComponent } from './features/cats/cats-table/cats-table.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProfileComponent } from './features/auth/profile/profile.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
export const routes: Routes = [
  { 
    path: '', 
    canActivate: [NoAuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]
  },
  
  // Auth routes (solo para usuarios NO autenticados)
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [NoAuthGuard],
    data: { animation: 'login' }
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
    data: { animation: 'register' }
  },
  
  // Protected routes
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { animation: 'profile' }
  },
  { 
    path: 'cats', 
    component: CatsListComponent,
    canActivate: [AuthGuard],
    data: { animation: 'cats' }
  },
  { 
    path: 'cats-table', 
    component: CatsTableComponent,
    canActivate: [AuthGuard],
    data: { animation: 'catsTable' }
  },
];
