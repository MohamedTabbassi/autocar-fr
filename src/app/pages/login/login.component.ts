import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service.service'; // Updated import
import { UserRole } from '../../models/user-model.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    console.log('Login attempt:', this.f['email'].value);
    this.authService.login(this.f['email'].value, this.f['password'].value).subscribe({
      next: (response) => {
        console.log('Login success:', response);
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Login error:', error);
      }
    });
  }

  loginAsDemo(role: UserRole): void {
    this.loading = true;
    console.log('Demo login as:', role);
    this.authService.demoLogin(role).subscribe({
      next: () => {
        console.log('Demo login success:', role);
        if (role === UserRole.ADMIN) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate([this.returnUrl]);
        }
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Demo login error:', error);
      }
    });
  }
}