import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth-service.service";

@Component({
  selector: "app-car-card",
  imports: [CommonModule],
  templateUrl: "./car-card.component.html",
  styleUrls: ["./car-card.component.css"],
  standalone: true
})
export class CarCardComponent {
  @Input() car: any;
  @Output() bookCar = new EventEmitter<any>();
  @Output() redirectToLogin = new EventEmitter<void>(); // New event for redirecting to login
  @Output() bookService = new EventEmitter<any>();

  constructor(private authService: AuthService) {}

  calculateDays(startDate: string, endDate: string): number {
    if (!startDate || !endDate) {
      return 1; // Default to 1 day
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  }

  calculateTotalPrice(pricePerDay: number, startDate: string, endDate: string): number {
    return pricePerDay * this.calculateDays(startDate, endDate);
  }

  onBookClick(): void {
    if (!this.authService.isLoggedIn()) {
      this.redirectToLogin.emit(); // Emit event to redirect to login
    } else {
      this.bookCar.emit(this.car); // Proceed with booking if authenticated
    }
  }
}