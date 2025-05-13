import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-mechanic-service",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./mechanic-service.component.html",
  styleUrls: ["./mechanic-service.component.css"],
})
export class MechanicServiceComponent implements OnInit {
  loading = false
  error: string | null = null
  selectedCategory = ""

  // For appointment booking
  appointmentRequest = {
    serviceType: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    preferredDate: "",
    preferredTime: "",
    customerName: "",
    contactNumber: "",
    additionalInfo: "",
    serviceLocation: "shop", // Default to shop, can be 'shop' or 'home'
  }

  // Service categories
  serviceCategories = [
    { id: "maintenance", name: "Entretien régulier" },
    { id: "repair", name: "Réparation" },
    { id: "diagnostic", name: "Diagnostic" },
    { id: "suspension", name: "Suspension et direction" },
    { id: "brakes", name: "Freins" },
    { id: "engine", name: "Moteur" },
    { id: "electrical", name: "Système électrique" },
    { id: "mobile", name: "Service à domicile" },
  ]

  // Mock mechanic services
  mechanicServices = [
    {
      id: 1,
      name: "Vidange d'huile et remplacement de filtre",
      description: "Changement complet de l'huile moteur et remplacement du filtre à huile.",
      price: 59.99,
      category: "maintenance",
      duration: "30-45 min",
      warranty: "3 mois",
      imageUrl: "assets/images/services/oil-change.jpg",
    },
    {
      id: 2,
      name: "Remplacement des plaquettes de frein",
      description: "Remplacement des plaquettes de frein avant ou arrière avec vérification des disques.",
      price: 89.99,
      category: "brakes",
      duration: "1-2 heures",
      warranty: "1 an",
      imageUrl: "assets/images/services/brake-pads.jpg",
    },
    {
      id: 3,
      name: "Diagnostic électronique complet",
      description: "Analyse complète des systèmes électroniques du véhicule avec rapport détaillé.",
      price: 49.99,
      category: "diagnostic",
      duration: "30-45 min",
      warranty: "N/A",
      imageUrl: "assets/images/services/diagnostic.jpg",
    },
    {
      id: 4,
      name: "Remplacement d'amortisseurs",
      description: "Remplacement des amortisseurs avant ou arrière pour améliorer la tenue de route.",
      price: 199.99,
      category: "suspension",
      duration: "2-3 heures",
      warranty: "2 ans",
      imageUrl: "assets/images/services/suspension.jpg",
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  // Get filtered services based on category
  get filteredServices() {
    return this.selectedCategory
      ? this.mechanicServices.filter((service) => service.category === this.selectedCategory)
      : this.mechanicServices
  }

  handleInputChange(event: Event): void {
    const element = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    const { name, value } = element
    this.appointmentRequest = {
      ...this.appointmentRequest,
      [name]: value,
    }
  }

  handleRadioChange(value: string): void {
    this.appointmentRequest = {
      ...this.appointmentRequest,
      serviceLocation: value,
    }
  }

  bookAppointment(event: Event): void {
    event.preventDefault()
    // Here you would implement the API call to book an appointment
    const locationText = this.appointmentRequest.serviceLocation === "home" ? "à domicile" : "à l'atelier"
    alert(`Demande de rendez-vous ${locationText} envoyée! Nous vous contacterons pour confirmer.`)
    console.log("Appointment request:", this.appointmentRequest)

    // Reset form
    this.appointmentRequest = {
      serviceType: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      preferredDate: "",
      preferredTime: "",
      customerName: "",
      contactNumber: "",
      additionalInfo: "",
      serviceLocation: "shop",
    }
  }

  setCategory(category: string): void {
    this.selectedCategory = category === this.selectedCategory ? "" : category
  }
}
