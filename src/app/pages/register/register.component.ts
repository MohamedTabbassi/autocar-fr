import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { AuthService } from "../../services/auth-service.service"
import { UserRole } from "../../models/user-model.service"
import { CommonModule } from "@angular/common"
@Component({
  selector: "app-register",
  imports:[CommonModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  loading = false
  submitted = false
  error = ""

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"])
    }

    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        phoneNumber: ["", [Validators.required, Validators.pattern(/^\+?[0-9\s\-$$$$]+$/)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        address: [""],
        city: [""],
        agreeTerms: [false, Validators.requiredTrue],
      },
      {
        validator: this.mustMatch("password", "confirmPassword"),
      },
    )
  }

  ngOnInit(): void {}

  // Custom validator to check if passwords match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]
      const matchingControl = formGroup.controls[matchingControlName]

      if (matchingControl.errors && !matchingControl.errors["mustMatch"]) {
        // Return if another validator has already found an error
        return
      }

      // Set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return
    }

    this.loading = true

    const user = {
      firstName: this.f["firstName"].value,
      lastName: this.f["lastName"].value,
      email: this.f["email"].value,
      password: this.f["password"].value,
      phoneNumber: this.f["phoneNumber"].value,
      address: this.f["address"].value,
      city: this.f["city"].value,
      role: UserRole.CUSTOMER, // Default role for new registrations
    }

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(["/login"], {
          queryParams: { registered: true },
        })
      },
      error: (error) => {
        this.error = error
        this.loading = false
      },
    })
  }
}
