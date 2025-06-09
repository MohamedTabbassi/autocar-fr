import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environement.service';
import { AuthService } from './auth-service.service';
import { ProductService } from './product.service.service';
interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  id: string;
  userId: string;
  items: Array<{
    productId: any; // Populated product
    quantity: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiBaseUrl}/cart`; // Base URL: http://localhost:3001/api/cart
  private token: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Subscribe to token$ to get the latest token value
    this.authService.token$.subscribe(token => {
      this.token = token;
    });
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
addToCart(productId: string, quantity: number = 1): Observable<ApiResponse<Cart>> {
const body = { productId, quantity };
return this.http.post<ApiResponse<Cart>>(`${this.apiUrl}/add`, body, {
headers: this.getHeaders(),
}).pipe(
tap(response => {
if (response.success && response.data) {
console.log('Added to cart:', response.data);
}
}),
catchError(this.handleError)
);
}
 

  getCart(): Observable<ApiResponse<Cart>> {
    return this.http.get<ApiResponse<Cart>>(this.apiUrl, { headers: this.getHeaders() }).pipe(
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