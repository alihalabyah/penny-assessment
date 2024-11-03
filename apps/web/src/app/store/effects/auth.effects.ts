import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '@/app/features/auth/services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { LoginResponse } from '@/types/login-response';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(action => console.log('Login effect triggered:', action)),
      switchMap(({ email, password }) => {
        console.log('Attempting login with:', email);
        return this.authService.login({ email, password })?.pipe(
          tap(response => console.log('Login response:', response)),
          map((response: LoginResponse) => AuthActions.loginSuccess({
            user: response.user,
            token: response.token || ''
          })),
          catchError((error) => {
            console.error('Login error:', error);
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        ) ?? of(AuthActions.loginFailure({ error: 'Login service unavailable' }));
      })
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user, token }) => {
        // Store token in localStorage
        if (token) {
          localStorage.setItem('token', token);
        }
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        // Clear both token and user from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }),
      switchMap(() =>
        of(null).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) => of(AuthActions.logoutFailure({ error: error.message })))
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ email, password, name }) =>
        this.authService.signup({ email, password, name }).pipe(
          map(response => {
            localStorage.setItem('token', response.token);
            return AuthActions.signupSuccess({ user: response.user, token: response.token });
          }),
          catchError(error => of(AuthActions.signupFailure({
            error: error.error.message || 'Signup failed. Please try again.'
          })))
        )
      )
    )
  );

  signupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupSuccess),
      tap(({ user, token }) => {
        // Store token in localStorage
        if (token) {
          localStorage.setItem('token', token);
        }
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

}
