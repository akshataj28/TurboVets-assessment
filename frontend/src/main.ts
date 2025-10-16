import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { tokenInterceptor } from './app/core/token.interceptor';

const routes: Routes = [
  { path: 'login', loadComponent: () => import('./app/features/login.component').then(m => m.LoginComponent) },
  { path: '', loadComponent: () => import('./app/features/dashboard.component').then(m => m.DashboardComponent) },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ]
}).catch(err => console.error(err));
