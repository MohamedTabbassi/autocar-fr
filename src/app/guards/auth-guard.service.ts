import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, of, throwError } from "rxjs"
import { catchError, tap } from "rxjs/operators"
import {  User, UserRole } from "../models/user-model.service"
import  { Router } from "@angular/router"

interface AuthResponse {
  user: User
  token: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "api/auth" // Replace with your actual API URL
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  private tokenSubject = new BehaviorSubject<string | null>(null)

  public currentUser$ = this.currentUserSubject.asObservable()
  public token$ = this.tokenSubject.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadUserFromStorage()
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem("currentUser")
    const storedToken = localStorage.getItem("token")

    if (storedUser && storedToken) {
      this.currentUserSubject.next(JSON.parse(storedUser))
      this.tokenSubject.next(storedToken)
    }
  }

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user).pipe(
      tap((response) => this.handleAuthentication(response)),
      catchError(this.handleError),
    )
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => this.handleAuthentication(response)),
      catchError(this.handleError),
    )
  }

  logout(): void {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    this.currentUserSubject.next(null)
    this.tokenSubject.next(null)
    this.router.navigate(["/login"])
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value
  }

  hasRole(role: UserRole): boolean {
    const user = this.currentUserSubject.value
    return user !== null && user.role === role
  }

  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN)
  }

  private handleAuthentication(response: AuthResponse): void {
    const { user, token } = response

    localStorage.setItem("currentUser", JSON.stringify(user))
    localStorage.setItem("token", token)

    this.currentUserSubject.next(user)
    this.tokenSubject.next(token)
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = "An unknown error occurred!"

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`
    } else if (error.status) {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }

    return throwError(() => new Error(errorMessage))
  }

  // For demo purposes only - remove in production
  demoLogin(role: UserRole): Observable<AuthResponse> {
    const demoUser: User = {
      _id: "demo-" + Math.random().toString(36).substr(2, 9),
      email: `demo${role}@example.com`,
      name: "Demo",
       
      role: role,
      createdAt: new Date(),
    }

    const demoResponse: AuthResponse = {
      user: demoUser,
      token: "demo-token-" + Math.random().toString(36).substr(2, 16),
    }

    this.handleAuthentication(demoResponse)
    return of(demoResponse)
  }
}
