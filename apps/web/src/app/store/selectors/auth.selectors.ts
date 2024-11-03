import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../types/auth.types';
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);
