import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service.service";
import { UserRole } from "../../models/user-model.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }

    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        phoneNumber: ["", [Validators.required, Validators.pattern(/^\+?[0-9\s\-]+$/)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        address: [""],
        city: [""],
        agreeTerms: [false, Validators.requiredTrue],
        role: [UserRole.CLIENT],
      },
      {
        validator: this.matchPasswords("password", "confirmPassword"),
      }
    );
  }

  ngOnInit(): void {}

  get f() {
    return this.registerForm.controls;
  }

  matchPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.get(passwordKey);
      const confirmPassword = formGroup.get(confirmPasswordKey);

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mustMatch: true });
      } else {
        confirmPassword?.setErrors(null);
      }
    };
  }

  onSubmit() {
    this.submitted = true;
    this.error = "";

    if (this.registerForm.invalid) return;

    this.loading = true;

    const formData = {
      name: this.registerForm.value.firstName + " " + this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.phoneNumber,
      address: this.registerForm.value.address,
      city: this.registerForm.value.city,
      role: this.registerForm.value.role,
    };

    this.authService.register(formData).subscribe({
      next: () => {
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.error = err.error?.message || "Registration failed";
        this.loading = false;
      },
    });
  }
}