import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '@/app/store/actions/auth.actions';
import { selectAuthState } from '@/app/store/selectors/auth.selectors';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements OnDestroy {
  private tokenCheckInterval: Subscription | null = null;
  private readonly CHECK_INTERVAL = 60000; // Check every minute

  constructor(private store: Store) {
    this.initTokenCheck();
  }

  initTokenCheck() {
    // Clean up existing subscription if any
    this.tokenCheckInterval?.unsubscribe();

    this.tokenCheckInterval = this.store.select(selectAuthState)
      .subscribe(authState => {
        if (authState?.token) {
          this.startTokenExpirationCheck(authState.token);
        }
      });
  }

  private startTokenExpirationCheck(token: string) {
    interval(this.CHECK_INTERVAL)
      .pipe(
        takeWhile(() => !!token)
      )
      .subscribe(() => {
        if (this.isTokenExpired(token)) {
          this.store.dispatch(logout());
        }
      });
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch {
      return true;
    }
  }

  ngOnDestroy() {
    this.tokenCheckInterval?.unsubscribe();
  }
}
