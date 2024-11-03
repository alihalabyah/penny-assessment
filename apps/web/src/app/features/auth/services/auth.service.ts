import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import { LoginResponse } from '@/types/login-response';
interface LoginCredentials {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<LoginResponse['user'] | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticated = false;

  constructor(private http: HttpClient) {
    // Check if window exists before accessing localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      console.log('savedUser', savedUser);
      if (savedUser && savedUser !== 'undefined') {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/signin`, credentials)
      .pipe(
        tap(response => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.token || '');
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  signup(userData: { email: string; password: string; name: string }) {
    return this.http.post<{ token: string }>('/api/auth/signup', userData);
  }

  setAuthState(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
  }

  getAuthState(): boolean {
    return this.isAuthenticated;
  }
}
