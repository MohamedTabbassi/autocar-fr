import { Component, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../services/auth-service.service";

@Component({
  selector: "app-part-card",
  templateUrl: "./part-card.component.html",
  styleUrls: ["./part-card.component.css"],
})
export class PartCardComponent {
  @Input() part: any;
  @Output() addToCart = new EventEmitter<any>();
  @Output() redirectToLogin = new EventEmitter<void>(); // New event for redirecting to login

  constructor(private authService: AuthService) {}

  onAddToCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.redirectToLogin.emit(); // Emit event to redirect to login
    } else {
      this.addToCart.emit(this.part); // Proceed with adding to cart if authenticated
    }
  }
}