import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environement.service';
import { Booking } from '../models/bookin.model.service';
import { AuthService } from './auth-service.service';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiBaseUrl}/bookings`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getToken(): string | null {
let token: string | null = null;
this.authService.token$.subscribe(t => token = t);
return token;
}
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  createBooking(bookingData: Partial<Booking>): Observable<ApiResponse<Booking>> {
    return this.http.post<ApiResponse<Booking>>(this.apiUrl, bookingData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getBookings(): Observable<ApiResponse<Booking[]>> {
    return this.http.get<ApiResponse<Booking[]>>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getClientBookings(): Observable<ApiResponse<Booking[]>> {
    const url = `${this.apiUrl}/client`;
    return this.http.get<ApiResponse<Booking[]>>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getProviderBookings(): Observable<ApiResponse<Booking[]>> {
    const url = `${this.apiUrl}/provider`;
    return this.http.get<ApiResponse<Booking[]>>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getBookingById(id: string): Observable<ApiResponse<Booking>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse<Booking>>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateBookingStatus(id: string, status: string): Observable<ApiResponse<Booking>> {
    const url = `${this.apiUrl}/${id}/status`;
    return this.http.patch<ApiResponse<Booking>>(url, { status }, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateBooking(id: string, bookingData: Partial<Booking>): Observable<ApiResponse<Booking>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ApiResponse<Booking>>(url, bookingData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteBooking(id: string): Observable<ApiResponse<void>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse<void>>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getBookingsByUser(userId: string): Observable<ApiResponse<Booking[]>> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<ApiResponse<Booking[]>>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getBookingsByService(serviceId: string): Observable<ApiResponse<Booking[]>> {
    const url = `${this.apiUrl}/service/${serviceId}`;
    return this.http.get<ApiResponse<Booking[]>>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
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
}