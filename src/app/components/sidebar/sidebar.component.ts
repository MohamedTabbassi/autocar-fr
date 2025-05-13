import { Component, HostListener } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, RouterLinkActive } from "@angular/router"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  isCollapsed = false
  isMobile = false
  isMobileOpen = false

  // Data for sidebar navigation
  navItems = [
    {
      name: "Accueil",
      icon: "home",
      route: "/",
    },
    {
      name: "Location",
      icon: "car",
      route: "/car-rental",
    },
    {
      name: "Mécanique",
      icon: "tools",
      route: "/mechanic-service",
    },
    {
      name: "Pièces Auto",
      icon: "cog",
      route: "/auto-parts",
      children: [
        { name: "Filtres", route: "/auto-parts/filtres" },
        { name: "Freinage", route: "/auto-parts/freinage" },
        { name: "Courroie", route: "/auto-parts/courroie" },
        { name: "Allumage", route: "/auto-parts/allumage" },
        { name: "Suspension", route: "/auto-parts/suspension" },
        { name: "Direction", route: "/auto-parts/direction" },
      ],
    },
    {
      name: "Atelier Mobile",
      icon: "truck",
      route: "/mobile-mechanic",
    },
    {
      name: "Contact",
      icon: "envelope",
      route: "/contact",
    },
  ]

  // Expanded state for dropdown menus
  expandedItems: { [key: string]: boolean } = {}

  constructor() {
    // We'll check if we're in a browser environment before accessing window
    if (typeof window !== "undefined") {
      this.checkScreenSize()
    } else {
      // Default values for server-side rendering
      this.isMobile = false
      this.isCollapsed = false
    }
  }

  @HostListener("window:resize")
  checkScreenSize(): void {
    // Only run this in browser environment
    if (typeof window !== "undefined") {
      this.isMobile = window.innerWidth < 768
      if (this.isMobile) {
        this.isCollapsed = true
      }
    }
  }

  toggleSidebar(): void {
    if (this.isMobile) {
      this.isMobileOpen = !this.isMobileOpen
    } else {
      this.isCollapsed = !this.isCollapsed
    }
  }

  toggleExpandItem(name: string): void {
    this.expandedItems[name] = !this.expandedItems[name]
  }

  isExpanded(name: string): boolean {
    return this.expandedItems[name] || false
  }
}
