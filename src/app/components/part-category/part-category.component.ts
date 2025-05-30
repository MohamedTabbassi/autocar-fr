import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from "../car-card/car-card.component";

@Component({
  selector: 'app-part-category',
  imports: [FormsModule, CommonModule],
  templateUrl: './part-category.component.html',
  styleUrl: './part-category.component.css'
})

export class PartCategoryComponent {
constructor(private bookingService: BookingService) {}

onBookService(service: any): void {
const bookingPayload = {
serviceId: service._id,
date: new Date().toISOString().split('T')[0],
startTime: '10:00',
endTime: '12:00',
notes: 'Réservé via UI'
};
this.bookingService.createBooking(bookingPayload).subscribe({
  next: (response) => {
    console.log('✅ Réservation réussie:', response);
    alert('Réservation confirmée !');
  },
  error: (error) => {
    console.error('❌ Erreur de réservation:', error);
    alert('Erreur lors de la réservation.');
  }
});



}}
