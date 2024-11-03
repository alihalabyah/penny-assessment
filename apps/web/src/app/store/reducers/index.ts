import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state';
import { authReducer } from './auth.reducer';
import { AuthState } from '../types/auth.types';
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer as ActionReducer<AuthState>,
  // ... other reducers
};
