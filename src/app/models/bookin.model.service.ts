import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookinModelService {

  constructor() { }
}

export interface Booking {
  _id: string;
  clientId: string ;
  serviceId: string ;
  providerId: string ;
  date: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
