import { Component, OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { Router, ActivatedRoute } from "@angular/router"
import  { AuthService } from "../../services/auth-service.service"
import { UserRole } from "../../models/user-model.service"
import { CommonModule } from "@angular/common"
@Component({
  selector: "app-login",
  imports:[CommonModule],
  templateUrl:"./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  submitted = false
  error = ""
  returnUrl: string

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"])
    }

    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/"
  }

  ngOnInit(): void {}

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return
    }

    this.loading = true
    this.authService.login(this.f["email"].value, this.f["password"].value).subscribe({
      next: () => {
        this.router.navigate([this.returnUrl])
      },
      error: (error) => {
        this.error = error
        this.loading = false
      },
    })
  }

  // For demo purposes only - remove in production
  loginAsDemo(role: UserRole): void {
    this.loading = true
    this.authService.demoLogin(role).subscribe({
      next: () => {
        if (role === UserRole.ADMIN || role === UserRole.MANAGER) {
          this.router.navigate(["/admin/dashboard"])
        } else {
          this.router.navigate([this.returnUrl])
        }
      },
      error: (error) => {
        this.error = error
        this.loading = false
      },
    })
  }
}
