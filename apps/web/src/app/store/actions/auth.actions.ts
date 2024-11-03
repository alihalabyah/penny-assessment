import { createAction, props } from '@ngrx/store';
import { User } from '@/types/user';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User, token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: string }>());

export const signup = createAction(
  '[Auth] Signup',
  props<{ email: string; password: string; name: string }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: User, token: string }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);
