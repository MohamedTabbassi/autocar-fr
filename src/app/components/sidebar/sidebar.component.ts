import { Component, HostListener, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  isMobile = false;
  isMobileOpen = false;

  navItems = [
    { name: "Accueil", icon: "home", route: "/" },
    { name: "Location", icon: "car", route: "/car-rental" },
    { name: "Mécanique", icon: "tools", route: "/mechanic-service" },
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
    { name: "Atelier Mobile", icon: "truck", route: "/mobile-mechanic" },
    { name: "Contact", icon: "envelope", route: "/contact" },
  ];

  expandedItems: { [key: string]: boolean } = {};

  constructor() {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener("window:resize")
  checkScreenSize(): void {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      this.isMobile = width < 768;
      if (this.isMobile) {
        this.isCollapsed = true;
        this.isMobileOpen = false; // Ensure sidebar is closed on mobile by default
      } else {
        this.isMobileOpen = false; // Reset mobile open state on desktop
        this.isCollapsed = false; // Default to expanded on desktop
      }
    }
  }

  toggleSidebar(): void {
    if (this.isMobile) {
      this.isMobileOpen = !this.isMobileOpen;
    } else {
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed) {
        this.expandedItems = {}; // Collapse all dropdowns when sidebar collapses
      }
    }
  }

  toggleExpandItem(itemName: string): void {
    if (this.isCollapsed && !this.isMobile) return;
    this.expandedItems[itemName] = !this.expandedItems[itemName];
  }

  isExpanded(name: string): boolean {
    return this.expandedItems[name] || false;
  }
}