import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environement.prod.service';
import { User } from '../models/user-model.service';
import { Service } from '../models/service.model.service';
import { Booking } from '../models/bookin.model.service';
import { Product } from '../models/product.model.service';
import { Order } from '../models/order.model.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl; // Should be '/api' with proxy
  private token: string | null = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

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
    const url = `${this.apiUrl}/users/register`;
    console.log('ApiService Register URL:', url);
    return this.http.post(url, userData, {
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
    const url = `${this.apiUrl}/users/login`;
    console.log('ApiService Login URL:', url);
    return this.http.post(url, credentials, {
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

    

  // User methods
  getCurrentUser(): Observable<{ success: boolean; data: User }> {
    const url = `${this.apiUrl}/auth/me`;
    console.log('ApiService GetCurrentUser URL:', url);
    return this.http.get<{ success: boolean; data: User }>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  updateUser(userData: any): Observable<any> {
    const url = `${this.apiUrl}/users/update`;
    console.log('UpdateUser URL:', url);
    return this.http.put(url, userData, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  getAllUsers(): Observable<{ success: boolean; data: User[] }> {
    const url = `${this.apiUrl}/users`;
    console.log('GetAllUsers URL:', url);
    return this.http.get<{ success: boolean; data: User[] }>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  // Service methods
  getServices(): Observable<Service[]> {
    const url = `${this.apiUrl}/services`;
    console.log('GetServices URL:', url);
    return this.http.get<Service[]>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  getService(id: string): Observable<Service> {
    const url = `${this.apiUrl}/services/${id}`;
    console.log('GetService URL:', url);
    return this.http.get<Service>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  // Booking methods
  createBooking(bookingData: any): Observable<Booking> {
    const url = `${this.apiUrl}/bookings`;
    console.log('CreateBooking URL:', url);
    return this.http.post<Booking>(url, bookingData, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  getClientBookings(): Observable<Booking[]> {
    const url = `${this.apiUrl}/bookings/client`;
    console.log('GetClientBookings URL:', url);
    return this.http.get<Booking[]>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  getProviderBookings(): Observable<Booking[]> {
    const url = `${this.apiUrl}/bookings/provider`;
    console.log('GetProviderBookings URL:', url);
    return this.http.get<Booking[]>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  getBookingById(id: string): Observable<Booking> {
    const url = `${this.apiUrl}/bookings/${id}`;
    console.log('GetBookingById URL:', url);
    return this.http.get<Booking>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  updateBookingStatus(id: string, status: string): Observable<Booking> {
    const url = `${this.apiUrl}/bookings/${id}/status`;
    console.log('UpdateBookingStatus URL:', url);
    return this.http.patch<Booking>(url, { status }, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  updateBooking(id: string, bookingData: any): Observable<Booking> {
    const url = `${this.apiUrl}/bookings/${id}`;
    console.log('UpdateBooking URL:', url);
    return this.http.put<Booking>(url, bookingData, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  deleteBooking(id: string): Observable<any> {
    const url = `${this.apiUrl}/bookings/${id}`;
    console.log('DeleteBooking URL:', url);
    return this.http.delete(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  getBookingsByUser(userId: string): Observable<Booking[]> {
    const url = `${this.apiUrl}/bookings/user/${userId}`;
    console.log('GetBookingsByUser URL:', url);
    return this.http.get<Booking[]>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  getBookingsByService(serviceId: string): Observable<Booking[]> {
    const url = `${this.apiUrl}/bookings/service/${serviceId}`;
    console.log('GetBookingsByService URL:', url);
    return this.http.get<Booking[]>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  // Product methods
  getProducts(filters: { category?: string; searchQuery?: string; compatibility?: string } = {}): Observable<{ success: boolean; count: number; data: Product[] }> {
    let url = `${this.apiUrl}/products`;
    console.log('GetProducts URL:', url);
    let params = new HttpParams();
    if (filters.category) params = params.set('category', filters.category);
    if (filters.searchQuery) params = params.set('searchQuery', filters.searchQuery);
    if (filters.compatibility) params = params.set('compatibility', filters.compatibility);
    return this.http.get<{ success: boolean; count: number; data: Product[] }>(url, {
      headers: this.getHeaders(),
      params
    }).pipe(catchError(this.handleError));
  }

  getProduct(id: string): Observable<Product> {
    const url = `${this.apiUrl}/products/${id}`;
    console.log('GetProduct URL:', url);
    return this.http.get<Product>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  // Order methods
  createOrder(orderData: { products: { productId: string; quantity: number }[]; shippingAddress: string }): Observable<Order> {
    const url = `${this.apiUrl}/orders`;
    console.log('CreateOrder URL:', url);
    return this.http.post<Order>(url, orderData, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  getMyOrders(): Observable<Order[]> {
    const url = `${this.apiUrl}/orders/myorders`;
    console.log('GetMyOrders URL:', url);
    return this.http.get<Order[]>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  getOrders(): Observable<Order[]> {
    const url = `${this.apiUrl}/orders`;
    console.log('GetOrders URL:', url);
    return this.http.get<Order[]>(url, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  // Contact form submission
  submitContactForm(formData: any): Observable<any> {
    const url = `${this.apiUrl}/contact`;
    console.log('SubmitContactForm URL:', url);
    return this.http.post(url, formData, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

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