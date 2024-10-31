import { Route } from '@angular/router';

export const authRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup.component').then(m => m.SignupComponent)
  }
];
