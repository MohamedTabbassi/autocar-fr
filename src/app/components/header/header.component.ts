import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, RouterLinkActive } from "@angular/router"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  isMenuOpen = false
  cartItemCount = 0
  isLoggedIn = false

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  logout(): void {
    // In a real app, you would implement logout functionality
    this.isLoggedIn = false
  }
}
