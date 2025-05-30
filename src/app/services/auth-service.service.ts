import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environement.service';  // fixed path typo
import { User, UserRole } from '../models/user-model.service';
import { Router } from '@angular/router';

interface AuthResponse {
  success: boolean;
  user?: User;
  data?: User | User[];
  token?: string;
  count?: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;  // fixed string interpolation
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        this.currentUserSubject.next(JSON.parse(storedUser));
        this.tokenSubject.next(storedToken);
      }
    }
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.tokenSubject.value;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        if (response.success && response.user && response.token) {
          this.handleAuthentication(response);
        }
      }),
      catchError(this.handleError)
    );
  }

 login(email: string, password: string): Observable<AuthResponse> {
  const url = this.apiUrl.endsWith('/') ? `${this.apiUrl}login` : `${this.apiUrl}/login`;
  console.log('Login URL:', url);

  return this.http.post<AuthResponse>(url, { email, password }, { headers: this.getHeaders() }).pipe(
    tap(response => this.handleAuthentication(response)),
    catchError(this.handleError)
  );
}


  getCurrentUser(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/me`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userData: Partial<User>): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${environment.apiBaseUrl}/users/update`, userData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getAllUsers(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.apiBaseUrl}/users`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(role: UserRole): boolean {
    const user = this.currentUserSubject.value;
    return user !== null && user.role === role;
  }

  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN);
  }

  private handleAuthentication(response: AuthResponse): void {
    if (response.success && response.user && response.token) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
      }
      this.currentUserSubject.next(response.user);
      this.tokenSubject.next(response.token);
    }
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  demoLogin(role: UserRole): Observable<AuthResponse> {
    const demoUser: User = {
      _id: 'demo-' + Math.random().toString(36).substr(2, 9),
      email: `demo${role}@example.com`,
      name: 'Demo ' + role,
      role: role,
      createdAt: new Date()
    };
    const demoResponse: AuthResponse = {
      success: true,
      user: demoUser,
      token: 'demo-token-' + Math.random().toString(36).substr(2, 16)
    };
    this.handleAuthentication(demoResponse);
    return of(demoResponse);
  }
}
