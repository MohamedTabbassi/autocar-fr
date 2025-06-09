import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
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
private token: string | null = null;

constructor(private http: HttpClient, private authService: AuthService) {
// Keep the token updated
this.authService.token$.subscribe((t) => {
this.token = t;
});
}

private getHeaders(): HttpHeaders {
let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
if (this.token) {
headers = headers.set('Authorization', `Bearer ${this.token}'`);
}
return headers;
}

/**

Used to create a booking. Required fields:

serviceId: string (MongoDB ObjectId)

date: string (ISO date)

startTime: string (e.g. "10:00")

endTime: string (e.g. "12:00")

notes?: string
*/
createBooking(bookingData: {
serviceId: string;
date: string;
startTime: string;
endTime: string;
notes?: string;
}): Observable<ApiResponse<Booking>> {
return this.http
.post<ApiResponse<Booking>>(this.apiUrl, bookingData, {
headers: this.getHeaders()
})
.pipe(catchError(this.handleError));
}

getBookings(): Observable<ApiResponse<Booking[]>> {
return this.http
.get<ApiResponse<Booking[]>>(this.apiUrl, { headers: this.getHeaders() })
.pipe(catchError(this.handleError));
}

getClientBookings(): Observable<ApiResponse<Booking[]>> {
return this.http
.get<ApiResponse<Booking[]>>(`${this.apiUrl}/client`, {
headers: this.getHeaders()
})
.pipe(catchError(this.handleError));
}

getProviderBookings(): Observable<ApiResponse<Booking[]>> {
return this.http
.get<ApiResponse<Booking[]>>(`${this.apiUrl}/provider`, {
headers: this.getHeaders()
})
.pipe(catchError(this.handleError));
}

getBookingById(id: string): Observable<ApiResponse<Booking>> {
return this.http
.get<ApiResponse<Booking>>(`${this.apiUrl}/${id}`, {
headers: this.getHeaders()
})
.pipe(catchError(this.handleError));
}

updateBookingStatus(id: string, status: string): Observable<ApiResponse<Booking>> {
return this.http
.patch<ApiResponse<Booking>>(`${this.apiUrl}/${id}/status, { status }`, {
headers: this.getHeaders()
})
.pipe(catchError(this.handleError));
}

updateBooking(id: string, bookingData: Partial<Booking>): Observable<ApiResponse<Booking>> {
return this.http
.put<ApiResponse<Booking>>(`${this.apiUrl}/${id}, bookingData`, {
headers: this.getHeaders()
})
.pipe(catchError(this.handleError));
}

deleteBooking(id: string): Observable<ApiResponse<void>> {
return this.http
.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`, {
headers: this.getHeaders()
})
.pipe(catchError(this.handleError));
}

getBookingsByUser(userId: string): Observable<ApiResponse<Booking[]>> {
return this.http
.get<ApiResponse<Booking[]>>(`${this.apiUrl}/user/${userId}`, {
headers: this.getHeaders()
})
.pipe(catchError(this.handleError));
}



getBookingsByService(serviceId: string): Observable<ApiResponse<Booking[]>> {
return this.http
.get<ApiResponse<Booking[]>>(`${this.apiUrl}/service/${serviceId}`, {
headers: this.getHeaders()
})
.pipe(catchError(this.handleError));
}

private handleError(error: any): Observable<never> {
let errorMessage = 'An error occurred. Please try again later.';

if (error.error instanceof ErrorEvent) {

} else {
errorMessage = error.error?.nMessage
}

console.error(errorMessage);
return throwError(() => new Error(errorMessage));
}

}


