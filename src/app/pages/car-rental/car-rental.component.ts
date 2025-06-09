import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service.service";
import { CarCardComponent } from "../../components/car-card/car-card.component"; // Import CarCardComponent
import { BookingService } from "../../services/booking.service.service";
@Component({
  selector: "app-car-rental",
  standalone: true,
  imports: [CommonModule, FormsModule, CarCardComponent],
  templateUrl: "./car-rental.component.html",
  styleUrls: ["./car-rental.component.css"],
})
export class CarRentalComponent implements OnInit {
  loading = false;
  error: string | null = null;
  activeTab = "cars";
  selectedVehicle: any | null = null;
  differentReturnLocation = false;

  // For rental search
  searchParams = {
    startDate: this.formatDate(new Date()),
    endDate: this.formatDate(new Date(Date.now() + 86400000)), // tomorrow
    startTime: "10:00",
    endTime: "10:00",
    vehicleType: "",
    location: "",
    returnLocation: "",
  };

  // Filter options
  filterCategory = "";
  filterTransmission = "";
  filterSeats = "";
  filterFuel = "";

  // Booking options
  bookingOptions = {
    insurance: false,
    gps: false,
    childSeat: false,
    additionalDriver: false,
  };

  // Locations
  locations = [
    { id: "tunis", name: "Aéroport Tunis Carthage" },
    { id: "carthage", name: "Tunis Centre" },
    { id: "sousse", name: "Sousse" },
    { id: "monastir", name: "Aéroport Monastir" },
    { id: "djerba", name: "Djerba" },
    { id: "enfidha", name: "Aéroport Enfidha" },
    { id: "hammamet", name: "Hammamet" },
    { id: "tozeur", name: "Tozeur" },
    { id: "tabarka", name: "Tabarka" },
  ];

  // Updated vehicles data based on provided list
  mockVehicles = [
    {
      id: 1,
      name: "Hyundai i10",
      category: "economy",
      class: "A",
      seats: 4,
      transmission: "Automatique",
      fuelType: "Essence",
      pricePerDay: 120,
      features: ["Climatisation", "Radio", "Bluetooth"],
      imageUrl: "assets/images/hyundai.jpg",
      isNew: true,
      hasAC: true,
      luggage: 2,
    },
    {
      id: 2,
      name: "Skoda Fabia",
      category: "economy",
      class: "A",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Essence",
      pricePerDay: 120,
      features: ["Climatisation", "Radio", "Bluetooth"],
      imageUrl: "assets/images/skodaFabia.jpg",
      isNew: false,
      hasAC: true,
      luggage: 3,
    },
    {
      id: 3,
      name: "Seat Ibiza (AC) Tunisie",
      category: "compact",
      class: "B",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Essence",
      pricePerDay: 122,
      features: ["Climatisation", "Radio", "Bluetooth", "USB"],
      imageUrl: "assets/images/ibiza.jpg",
      isNew: false,
      hasAC: true,
      luggage: 3,
    },
    {
      id: 4,
      name: "Suzuki Swift BVA",
      category: "economy",
      class: "B",
      seats: 5,
      transmission: "Automatique",
      fuelType: "Essence",
      pricePerDay: 122,
      features: ["Climatisation", "Radio", "Bluetooth"],
      imageUrl: "assets/images/suzuki.jpg",
      isNew: true,
      hasAC: true,
      luggage: 3,
    },
    {
      id: 5,
      name: "Volkswagen Polo (AC) Tunisie",
      category: "compact",
      class: "B",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Essence",
      pricePerDay: 122,
      features: ["Climatisation", "Radio", "Bluetooth", "USB"],
      imageUrl: "assets/images/volkswagen.jpg",
      isNew: false,
      hasAC: true,
      luggage: 3,
    },
    {
      id: 6,
      name: "Citroen C3 (AC) Tunisie",
      category: "compact",
      class: "B",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Essence",
      pricePerDay: 122,
      features: ["Climatisation", "Radio", "Bluetooth"],
      imageUrl: "assets/images/citeoenC3.jpg",
      isNew: false,
      hasAC: true,
      luggage: 3,
    },
    {
      id: 7,
      name: "Ford Fiesta (AC) Tunisie",
      category: "compact",
      class: "B",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Essence",
      pricePerDay: 122,
      features: ["Climatisation", "Radio", "Bluetooth", "USB"],
      imageUrl: "assets/images/ford.jpg",
      isNew: false,
      hasAC: true,
      luggage: 3,
    },
    {
      id: 8,
      name: "Peugeot 301 Tunisie",
      category: "sedan",
      class: "B",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Diesel",
      pricePerDay: 1118,
      features: ["Climatisation", "Radio", "Bluetooth", "USB"],
      imageUrl: "assets/images/peugeot301.jpg",
      isNew: false,
      hasAC: true,
      luggage: 4,
    },
    {
      id: 9,
      name: "Renault Kangoo (AC) Tunisie",
      category: "van",
      class: "D",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Diesel",
      pricePerDay: 125,
      features: ["Climatisation", "Radio", "Bluetooth"],
      imageUrl: "assets/images/renault.jpeg",
      isNew: false,
      hasAC: true,
      luggage: 5,
    },
    {
      id: 10,
      name: "Renault Megane (AC) Tunisie",
      category: "sedan",
      class: "C",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Diesel",
      pricePerDay: 128,
      features: ["Climatisation", "Radio", "Bluetooth", "USB"],
      imageUrl: "assets/images/renaultMegane.jpeg",
      isNew: false,
      hasAC: true,
      luggage: 4,
    },
    {
      id: 11,
      name: "Ford Eco Sport",
      category: "suv",
      class: "C",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Essence",
      pricePerDay: 129,
      features: ["Climatisation", "Radio", "Bluetooth", "USB"],
      imageUrl: "assets/images/fordEco.jpg",
      isNew: true,
      hasAC: true,
      luggage: 3,
    },
    {
      id: 12,
      name: "Volkswagen Golf",
      category: "compact",
      class: "C",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Diesel",
      pricePerDay: 132,
      features: ["Climatisation", "Radio", "Bluetooth", "USB", "GPS"],
      imageUrl: "assets/images/golf.jpg",
      isNew: true,
      hasAC: true,
      luggage: 3,
    },
    {
      id: 13,
      name: "Skoda Octavia Tunisie",
      category: "sedan",
      class: "F",
      seats: 5,
      transmission: "Automatique",
      fuelType: "Diesel",
      pricePerDay: 135,
      features: ["Climatisation", "Radio", "Bluetooth", "USB", "GPS"],
      imageUrl: "assets/images/skoda.jpg",
      isNew: false,
      hasAC: true,
      luggage: 4,
    },
    {
      id: 14,
      name: "BMW Serie 3",
      category: "luxury",
      class: "F",
      seats: 5,
      transmission: "Automatique",
      fuelType: "Essence",
      pricePerDay: 180,
      features: ["Climatisation", "Radio", "Bluetooth", "GPS", "Cuir"],
      imageUrl: "assets/images/bmw.jpg",
      isNew: true,
      hasAC: true,
      luggage: 4,
    },
  ];

  // Price table for different car models
  priceTable = [
    { class: "A", model: "Hyundai i10", price3Days: 22, price1Week: 20 },
    { class: "A", model: "Skoda Fabia", price3Days: 22, price1Week: 20 },
    { class: "B", model: "Seat Ibiza (AC) Tunisie", price3Days: 25, price1Week: 22 },
    { class: "B", model: "Suzuki Swift BVA", price3Days: 25, price1Week: 22 },
    { class: "B", model: "Volkswagen POLO (AC) Tunisie", price3Days: 25, price1Week: 22 },
    { class: "B", model: "Citroen C3 (AC) Tunisie", price3Days: 25, price1Week: 22 },
    { class: "B", model: "Ford Fiesta (AC) Tunisie", price3Days: 25, price1Week: 22 },
    { class: "B", model: "Peugeot 301 Tunisie", price3Days: 20, price1Week: 18 },
    { class: "D", model: "Renault KANGOO (AC) Tunisie", price3Days: 30, price1Week: 25 },
    { class: "C", model: "Renault MEGANE (AC) Tunisie", price3Days: 28, price1Week: 28 },
    { class: "C", model: "Ford Eco Sport", price3Days: 29, price1Week: 29 },
    { class: "C", model: "Volkswagen GOLF", price3Days: 32, price1Week: 32 },
    { class: "F", model: "Skoda Octavia Tunisie", price3Days: 40, price1Week: 35 },
    { class: "F", model: "BMW Serie 3", price3Days: 100, price1Week: 80 },
  ];

  // Agencies information
  agencies = [
    {
      name: "Agence aéroport Tunis",
      description:
        "Vous êtes à la recherche d'une location voiture à l'aéroport de Tunis. Tunisia Rent Car vous livre le véhicule à votre arrivée. Notre agent vous attendra même en cas de retard d'avion.",
      phone: "00216 50 222 151 (24 H / 24 H 7 J / 7 J)",
      email: "reservation@tunisia-rent-car.com",
    },
    {
      name: "Agence aéroport Monastir",
      description:
        "Vous êtes à la recherche d'une location voiture à l'aéroport de Monastir. Tunisia Rent Car vous livre le véhicule à votre arrivée. Notre agent vous attendra même en cas de retard d'avion.",
      phone: "00216 50 222 151 (24 H / 24 H 7 J / 7 J)",
      email: "reservation@tunisia-rent-car.com",
    },
    {
      name: "Agence aéroport Enfidha",
      description:
        "Vous êtes à la recherche d'une location voiture à l'aéroport d'Enfidha. Tunisia Rent Car vous livre le véhicule à votre arrivée. Notre agent vous attendra même en cas de retard d'avion.",
      phone: "00216 50 222 151 (24 H / 24 H 7 J / 7 J)",
      email: "reservation@tunisia-rent-car.com",
    },
  ];

  // Strength points
  strengthPoints = [
    {
      title: "Transfert Aéroport",
      description: "Nous vous accueillons à l'aéroport et livrons votre véhicule sur place.",
    },
    { title: "Prix Compétitifs", description: "Nous offrons les meilleurs tarifs de location de voitures en Tunisie." },
    { title: "Véhicules Récents", description: "Notre flotte est composée de véhicules récents et bien entretenus." },
    { title: "Service 24/7", description: "Notre service client est disponible 24h/24 et 7j/7." },
    { title: "Kilométrage Illimité", description: "Tous nos forfaits incluent le kilométrage illimité." },
    { title: "Assurance Complète", description: "Tous nos véhicules sont entièrement assurés." },
  ];

  constructor(private authService: AuthService, private router: Router,private bookingService: BookingService) {}

  ngOnInit(): void {}

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  searchVehicles(): void {
    if (!this.searchParams.startDate || !this.searchParams.endDate) {
      alert("Veuillez sélectionner les dates de début et de fin de location");
      return;
    }

    const startDate = new Date(this.searchParams.startDate);
    const endDate = new Date(this.searchParams.endDate);

    if (startDate >= endDate) {
      alert("La date de fin doit être postérieure à la date de début");
      return;
    }

    this.loading = true;
    this.error = null;

    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      this.activeTab = "cars";
    }, 1000);
  }

  selectVehicle(vehicle: any): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.selectedVehicle = vehicle;
    this.bookingOptions = {
      insurance: false,
      gps: false,
      childSeat: false,
      additionalDriver: false,
    };
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  closeModal(): void {
    this.selectedVehicle = null;
  }

  calculateDays(): number {
    if (!this.searchParams.startDate || !this.searchParams.endDate) {
      return 1;
    }
    const startDate = new Date(this.searchParams.startDate);
    const endDate = new Date(this.searchParams.endDate);
    return Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  }

  calculateTotalPrice(vehicle: any): number {
    return vehicle.pricePerDay * this.calculateDays();
  }

  calculateOptionPrice(pricePerDay: number): number {
    return pricePerDay * this.calculateDays();
  }

  calculateFinalPrice(): number {
    if (!this.selectedVehicle) return 0;
    let total = this.calculateTotalPrice(this.selectedVehicle);
    if (this.bookingOptions.insurance) total += this.calculateOptionPrice(10);
    if (this.bookingOptions.gps) total += this.calculateOptionPrice(5);
    if (this.bookingOptions.childSeat) total += this.calculateOptionPrice(7);
    if (this.bookingOptions.additionalDriver) total += this.calculateOptionPrice(8);
    return total;
  }

  getLocationName(locationId: string): string {
    const location = this.locations.find((loc) => loc.id === locationId);
    return location ? location.name : "Location non spécifiée";
  }

  bookVehicle(): void {
if (!this.authService.isLoggedIn()) {
this.router.navigate(['/login']);
return;
}

if (!this.selectedVehicle) return;

const bookingData = {
serviceId: this.selectedVehicle._id, // Make sure _id comes from backend
date: this.searchParams.startDate,
startTime: this.searchParams.startTime,
endTime: this.searchParams.endTime,
notes: "Réservation voiture depuis UI"
};

this.bookingService.createBooking(bookingData).subscribe({
next: (response) => {
alert(`Réservation confirmée pour ${this.selectedVehicle.name} !`);

this.closeModal();
},
error: (error) => {
alert("Erreur lors de la réservation: " + error.message);
console.error(error);
}
});
}

  get filteredVehicles() {
    return this.mockVehicles.filter((vehicle) => {
      if (this.filterCategory && vehicle.category !== this.filterCategory) return false;
      if (this.filterTransmission && vehicle.transmission !== this.filterTransmission) return false;
      if (this.filterSeats && Number.parseInt(this.filterSeats) !== vehicle.seats) return false;
      if (this.filterFuel && vehicle.fuelType !== this.filterFuel) return false;
      return true;
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleDifferentReturnLocation(): void {
    this.differentReturnLocation = !this.differentReturnLocation;
  }
}