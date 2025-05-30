import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environement.service';
import { Service } from '../models/service.model.service';
import { AuthService } from './auth-service.service';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = `${environment.apiBaseUrl}/services`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.authService.token$;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getServices(): Observable<ApiResponse<Service[]>> {
    return this.http.get<ApiResponse<Service[]>>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getService(id: string): Observable<ApiResponse<Service>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse<Service>>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  createService(serviceData: Partial<Service>): Observable<ApiResponse<Service>> {
    return this.http.post<ApiResponse<Service>>(this.apiUrl, serviceData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateService(id: string, serviceData: Partial<Service>): Observable<ApiResponse<Service>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ApiResponse<Service>>(url, serviceData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteService(id: string): Observable<ApiResponse<void>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse<void>>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getServicesByUser(userId: string): Observable<ApiResponse<Service[]>> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<ApiResponse<Service[]>>(url, { headers: this.getHeaders() }).pipe(
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