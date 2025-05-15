import { Component,  OnInit } from "@angular/core"
import  { Router } from "@angular/router"
import  { AuthService } from "../../services/auth-service.service"
import { User } from "../../models/user-model.service"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-admin-layout",
  imports:[CommonModule],
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.css"],
})
export class AdminLayoutComponent implements OnInit {
  currentUser: User | null = null
  isSidebarCollapsed = false
  isMobile = window.innerWidth < 992

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
    })

    window.addEventListener("resize", this.checkScreenSize.bind(this))
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 992
    if (this.isMobile) {
      this.isSidebarCollapsed = true
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed
  }

  logout(): void {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    window.removeEventListener("resize", this.checkScreenSize.bind(this))
  }
}
