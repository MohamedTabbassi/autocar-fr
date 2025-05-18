import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceModelService {

  constructor() { }
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  category: 'REMORQUAGE' | 'MECANIQUE' | 'PIECE_AUTO' | 'LOCATION_VOITURE';
  location: string;
  price: number;
  image?: string;
  userId: string;
  available: boolean;
  createdAt: string;
  // Optional fields based on category
  vehicleType?: string;
  distance?: number;
  urgency?: string;
  brand?: string;
  model?: string;
  year?: number;
  partNumber?: string;
  repairType?: string;
  estimatedTime?: string;
  toolsRequired?: string;
  carBrand?: string;
  carModel?: string;
  fuelType?: string;
  transmission?: string;
  rentalDuration?: string;
}
