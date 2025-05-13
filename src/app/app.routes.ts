import type { Routes } from "@angular/router"

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "car-rental",
    loadComponent: () => import("./pages/car-rental/car-rental.component").then((m) => m.CarRentalComponent),
  },
  {
    path: "mechanic-service",
    loadComponent: () =>
      import("./pages/mechanic-service/mechanic-service.component").then((m) => m.MechanicServiceComponent),
  },
  {
    path: "mobile-mechanic",
    loadComponent: () =>
      import("./pages/mobile-mechanic/mobile-mechanic.component").then((m) => m.MobileMechanicComponent),
  },
  {
    path: "auto-parts",
    loadComponent: () => import("./pages/auto-parts/auto-parts.component").then((m) => m.AutoPartsComponent),
  },
 
  {
    path: "contact",
    loadComponent: () => import("./pages/contact/contact.component").then((m) => m.ContactComponent),
  },
  {
    path: "**",
    redirectTo: "",
  },
]
