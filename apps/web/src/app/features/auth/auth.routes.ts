import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
