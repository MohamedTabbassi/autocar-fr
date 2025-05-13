import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  currentYear = new Date().getFullYear()

  // Footer links
  services = [
    { name: "Mécanique", route: "/mechanic-service" },
    { name: "Atelier Mobile", route: "/mobile-mechanic" },
    { name: "Pièces Auto", route: "/auto-parts" },
    { name: "Location", route: "/car-rental" },
  ]

  usefulLinks = [
    { name: "À propos", route: "/about" },
    { name: "Contact", route: "/contact" },
    { name: "FAQ", route: "/faq" },
    { name: "Conditions générales", route: "/terms" },
  ]
}
