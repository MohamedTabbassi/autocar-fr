import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { BookingService } from '../../services/booking.service.service';  // <-- import your BookingService
import { User } from '../../models/user-model.service';
import { Booking } from '../../models/bookin.model.service';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl:'./user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;

  // 1) Change-password form
  @ViewChild('pwdForm') pwdForm!: NgForm;
  oldPassword = '';
  newPassword = '';
  loading = false;
  passwordMsg: string | null = null;
  pwdError = false;

  // 2) Bookings list
  bookings: Array<{
    _id: string;
    serviceId: { name: string };
    date: string;
    startTime: string;
    endTime: string;
    status: string;
  }> = [];

  constructor(
    private auth: AuthService,
    private bookingService: BookingService  // <-- inject booking service
  ) {}

  ngOnInit() {
    // Load current user
    this.auth.currentUser$.subscribe((u) => (this.user = u));

    // Load client bookings
    this.bookingService.getClientBookings().subscribe({
      next: (resp) => {
       if (resp.success && resp.data) {
          this.bookings = resp.data;
        }
      },
      error: (err) => {
        console.error('Could not load bookings:', err);
      }
    });
  }

  onChangePassword(): void {
    // If form reference not ready yet, bail out
    if (!this.pwdForm || this.pwdForm.invalid) return;

    this.loading = true;
    this.passwordMsg = null;
    this.pwdError = false;

    this.auth.updatePassword(this.oldPassword, this.newPassword).subscribe({
      next: (resp) => {
        this.passwordMsg = resp.message || 'Mot de passe modifié !';
        this.oldPassword = '';
        this.newPassword = '';
        this.loading = false;
        setTimeout(() => (this.passwordMsg = null), 5000);
      },
      error: (err) => {
        this.pwdError = true;
        this.passwordMsg = err.message || 'Erreur de modification';
        this.loading = false;
        setTimeout(() => (this.passwordMsg = null), 5000);
      }
    });
  }
}
