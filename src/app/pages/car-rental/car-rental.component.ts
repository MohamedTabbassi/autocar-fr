import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-car-rental",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./car-rental.component.html",
  styleUrls: ["./car-rental.component.css"],
})
export class CarRentalComponent implements OnInit {
  loading = false
  error: string | null = null
  activeTab = "cars"
  selectedVehicle: any | null = null
  differentReturnLocation = false

  // For rental search
  searchParams = {
    startDate: this.formatDate(new Date()),
    endDate: this.formatDate(new Date(Date.now() + 86400000)), // tomorrow
    startTime: "10:00",
    endTime: "10:00",
    vehicleType: "",
    location: "",
    returnLocation: "",
  }

  // Filter options
  filterCategory = ""
  filterTransmission = ""
  filterSeats = ""
  filterFuel = ""

  // Booking options
  bookingOptions = {
    insurance: false,
    gps: false,
    childSeat: false,
    additionalDriver: false,
  }

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
  ]

  // Mock vehicles data
  mockVehicles = [
    {
      id: 1,
      name: "Fiat Panda",
      category: "economy",
      class: "A",
      seats: 4,
      transmission: "Manuelle",
      fuelType: "Essence",
      pricePerDay: 20,
      features: ["Climatisation", "Radio"],
      imageUrl: "assets/images/cars/panda.jpg",
      isNew: false,
      hasAC: true,
      luggage: 2,
    },
    {
      id: 2,
      name: "Renault Clio",
      category: "economy",
      class: "A",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Diesel",
      pricePerDay: 22,
      features: ["Climatisation", "Radio", "Bluetooth"],
      imageUrl: "assets/images/cars/clio.jpg",
      isNew: true,
      hasAC: true,
      luggage: 3,
    },
    {
      id: 3,
      name: "Volkswagen Polo",
      category: "compact",
      class: "B",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Essence",
      pricePerDay: 25,
      features: ["Climatisation", "Radio", "Bluetooth", "USB"],
      imageUrl: "assets/images/cars/polo.jpg",
      isNew: false,
      hasAC: true,
      luggage: 3,
    },
    {
      id: 4,
      name: "Hyundai i10 BVA",
      category: "economy",
      class: "A",
      seats: 4,
      transmission: "Automatique",
      fuelType: "Essence",
      pricePerDay: 22,
      features: ["Climatisation", "Radio", "Bluetooth"],
      imageUrl: "assets/images/cars/i10.jpg",
      isNew: true,
      hasAC: true,
      luggage: 2,
    },
    {
      id: 5,
      name: "Peugeot 301",
      category: "sedan",
      class: "B",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Diesel",
      pricePerDay: 20,
      features: ["Climatisation", "Radio", "Bluetooth", "USB"],
      imageUrl: "assets/images/cars/301.jpg",
      isNew: false,
      hasAC: true,
      luggage: 4,
    },
    {
      id: 6,
      name: "Volkswagen Golf",
      category: "compact",
      class: "C",
      seats: 5,
      transmission: "Manuelle",
      fuelType: "Diesel",
      pricePerDay: 32,
      features: ["Climatisation", "Radio", "Bluetooth", "USB", "GPS"],
      imageUrl: "assets/images/cars/golf.jpg",
      isNew: true,
      hasAC: true,
      luggage: 3,
    },
  ]

  // Price table for different car models
  priceTable = [
    { class: "A", model: "Hyundai i10", price3Days: 22, price1Week: 20 },
    { class: "A", model: "Skoda Fabia", price3Days: 22, price1Week: 20 },
    { class: "A", model: "Renault CLIO Symbole (AC)", price3Days: 22, price1Week: 20 },
    { class: "B", model: "Seat Ibiza (AC) Tunisie", price3Days: 25, price1Week: 22 },
    { class: "B", model: "Suzuki swift BVA", price3Days: 25, price1Week: 22 },
    { class: "B", model: "Volkswagen POLO (AC) Tunisie", price3Days: 25, price1Week: 22 },
    { class: "B", model: "Citroen C3 (AC) Tunisie", price3Days: 25, price1Week: 22 },
    { class: "B", model: "Fiat Grande PUNTO (AC) Tunisie", price3Days: 22, price1Week: 20 },
    { class: "B", model: "Ford Fiesta (AC) Tunisie", price3Days: 25, price1Week: 22 },
    { class: "B", model: "Peugeot 301 Tunisie", price3Days: 20, price1Week: 18 },
    { class: "D", model: "Renault KANGOO (AC) Tunisie", price3Days: 30, price1Week: 25 },
    { class: "C", model: "Renault MEGANE (AC) Tunisie", price3Days: 28, price1Week: 28 },
    { class: "C", model: "Ford Eco Sport", price3Days: 29, price1Week: 29 },
    { class: "C", model: "Volkswagen GOLF", price3Days: 32, price1Week: 32 },
    { class: "F", model: "Skoda Octavia Tunisie", price3Days: 40, price1Week: 35 },
    { class: "F", model: "BMW serie 3", price3Days: 100, price1Week: 80 },
  ]

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
  ]

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
  ]

  constructor() {}

  ngOnInit(): void {}

  formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  searchVehicles(): void {
    // Validate dates
    if (!this.searchParams.startDate || !this.searchParams.endDate) {
      alert("Veuillez sélectionner les dates de début et de fin de location")
      return
    }

    const startDate = new Date(this.searchParams.startDate)
    const endDate = new Date(this.searchParams.endDate)

    if (startDate >= endDate) {
      alert("La date de fin doit être postérieure à la date de début")
      return
    }

    this.loading = true
    this.error = null

    // Simulate API call
    setTimeout(() => {
      this.loading = false
      this.activeTab = "cars"
    }, 1000)
  }

  selectVehicle(vehicle: any): void {
    this.selectedVehicle = vehicle

    // Reset booking options
    this.bookingOptions = {
      insurance: false,
      gps: false,
      childSeat: false,
      additionalDriver: false,
    }
  }

  closeModal(): void {
    this.selectedVehicle = null
  }

  calculateDays(): number {
    if (!this.searchParams.startDate || !this.searchParams.endDate) {
      return 1 // Default to 1 day
    }

    const startDate = new Date(this.searchParams.startDate)
    const endDate = new Date(this.searchParams.endDate)
    return Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
  }

  calculateTotalPrice(vehicle: any): number {
    return vehicle.pricePerDay * this.calculateDays()
  }

  calculateOptionPrice(pricePerDay: number): number {
    return pricePerDay * this.calculateDays()
  }

  calculateFinalPrice(): number {
    if (!this.selectedVehicle) return 0

    let total = this.calculateTotalPrice(this.selectedVehicle)

    if (this.bookingOptions.insurance) {
      total += this.calculateOptionPrice(10)
    }

    if (this.bookingOptions.gps) {
      total += this.calculateOptionPrice(5)
    }

    if (this.bookingOptions.childSeat) {
      total += this.calculateOptionPrice(7)
    }

    if (this.bookingOptions.additionalDriver) {
      total += this.calculateOptionPrice(8)
    }

    return total
  }

  getLocationName(locationId: string): string {
    const location = this.locations.find((loc) => loc.id === locationId)
    return location ? location.name : "Location non spécifiée"
  }

  bookVehicle(): void {
    if (!this.selectedVehicle) {
      return
    }

    if (!this.searchParams.startDate || !this.searchParams.endDate) {
      alert("Veuillez sélectionner les dates de location")
      return
    }

    // Here you would implement the API call to book the vehicle
    alert(`Réservation du véhicule ${this.selectedVehicle.name} confirmée!`)
    console.log("Booking details:", {
      vehicle: this.selectedVehicle,
      dates: {
        startDate: this.searchParams.startDate,
        startTime: this.searchParams.startTime,
        endDate: this.searchParams.endDate,
        endTime: this.searchParams.endTime,
      },
      location: this.searchParams.location,
      returnLocation: this.differentReturnLocation ? this.searchParams.returnLocation : this.searchParams.location,
      options: this.bookingOptions,
      totalPrice: this.calculateFinalPrice(),
    })

    // Reset selection
    this.selectedVehicle = null
  }

  // Get filtered vehicles based on filters
  get filteredVehicles() {
    return this.mockVehicles.filter((vehicle) => {
      if (this.filterCategory && vehicle.category !== this.filterCategory) return false
      if (this.filterTransmission && vehicle.transmission !== this.filterTransmission) return false
      if (this.filterSeats && Number.parseInt(this.filterSeats) !== vehicle.seats) return false
      if (this.filterFuel && vehicle.fuelType !== this.filterFuel) return false
      return true
    })
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  toggleDifferentReturnLocation(): void {
    this.differentReturnLocation = !this.differentReturnLocation
  }
}
