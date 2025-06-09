import { Routes } from "@angular/router";
import { AdminGuard } from "./guards/admin.service";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { AuthService } from "./services/auth-service.service";



export const routes: Routes = [
     { path: 'user-profile', component: UserProfileComponent },
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
    path: "auto-parts/:categoryId",
    loadComponent: () =>
      import("./components/part-category/part-category.component").then((m) => m.PartCategoryComponent),
  },
  {
    path: "contact",
    loadComponent: () => import("./pages/contact/contact.component").then((m) => m.ContactComponent),
  },
  {
    path: "login",
    loadComponent: () => import("./pages/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () => import("./pages/register/register.component").then((m) => m.RegisterComponent),
  },

  
  
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./admin/admin-layout/admin-layout.component').then(
        m => m.AdminLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/dasshboard/dasshboard.component').then(
            m => m.DashboardComponent
          ),
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./admin/inventory/inventory.component').then(
            m => m.InventoryComponent
          ),
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];