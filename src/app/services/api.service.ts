import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environement.service';
import { User } from '../models/user-model.service';
import { Service } from '../models/service.model.service';
import { Booking, BookinModelService } from '../models/bookin.model.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;
  private token: string | null = null;

  constructor(private http: HttpClient) {
    // Load token from localStorage if available
    this.token = localStorage.getItem('token');
  }

  // Set token and store in localStorage
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Clear token
  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Get headers with token
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  // Authentication methods
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, userData, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, credentials, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.clearToken();
  }

  // Service methods
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getService(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/services/${id}`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Booking methods
  createBooking(bookingData: any): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, bookingData, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getClientBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings/client`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Contact form submission (already exists, just for reference)
  submitContactForm(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, formData, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}