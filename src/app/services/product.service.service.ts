import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environement.service';
import { Product } from '../models/product.model.service';
import { AuthService } from './auth-service.service';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.authService.token$;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getProducts(filters: { category?: string; searchQuery?: string; compatibility?: string } = {}): Observable<ApiResponse<Product[]>> {
    let params = new HttpParams();
    if (filters.category) params = params.set('category', filters.category);
    if (filters.searchQuery) params = params.set('searchQuery', filters.searchQuery);
    if (filters.compatibility) params = params.set('compatibility', filters.compatibility);
    return this.http.get<ApiResponse<Product[]>>(this.apiUrl, { headers: this.getHeaders(), params }).pipe(
      catchError(this.handleError)
    );
  }

  getProductById(id: string): Observable<ApiResponse<Product>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse<Product>>(url, { headers: this.getHeaders() }).pipe(
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