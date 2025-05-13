import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-mobile-mechanic",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./mobile-mechanic.component.html",
  styleUrls: ["./mobile-mechanic.component.css"],
})
export class MobileMechanicComponent implements OnInit {
  // Mobile services
  mobileServices = [
    {
      id: 1,
      name: "Vidange d'huile",
      description: "Changement d'huile et de filtre à domicile",
      originalPrice: 80,
      discountedPrice: 40,
      image: "assets/images/services/oil-change-mobile.jpg",
    },
    {
      id: 2,
      name: "Remplacement de batterie",
      description: "Installation d'une nouvelle batterie à domicile",
      originalPrice: 100,
      discountedPrice: 50,
      image: "assets/images/services/battery-replacement.jpg",
    },
    {
      id: 3,
      name: "Remplacement de freins",
      description: "Changement de plaquettes et/ou disques à domicile",
      originalPrice: 160,
      discountedPrice: 80,
      image: "assets/images/services/brake-service.jpg",
    },
    {
      id: 4,
      name: "Diagnostic électronique",
      description: "Analyse complète des systèmes de votre véhicule",
      originalPrice: 90,
      discountedPrice: 45,
      image: "assets/images/services/diagnostic-mobile.jpg",
    },
  ]

  // Booking form
  bookingRequest = {
    service: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    time: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    notes: "",
  }

  constructor() {}

  ngOnInit(): void {}

  handleInputChange(event: Event): void {
    const element = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    const { name, value } = element
    this.bookingRequest = {
      ...this.bookingRequest,
      [name]: value,
    }
  }

  handleSelectChange(name: string, value: string): void {
    this.bookingRequest = {
      ...this.bookingRequest,
      [name]: value,
    }
  }

  bookService(serviceId: number): void {
    const service = this.mobileServices.find((s) => s.id === serviceId)
    if (service) {
      this.bookingRequest = {
        ...this.bookingRequest,
        service: service.name,
      }
      // In a real app, you would show a booking modal or navigate to a booking page
      alert(
        `Vous avez sélectionné le service: ${service.name} à ${service.discountedPrice}€. Veuillez remplir le formulaire de réservation.`,
      )
      // Scroll to booking form
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  submitBooking(event: Event): void {
    event.preventDefault()
    // Here you would implement the API call to submit the booking
    alert("Votre demande de service à domicile a été envoyée! Nous vous contacterons bientôt pour confirmer.")
    console.log("Booking request:", this.bookingRequest)

    // Reset form
    this.bookingRequest = {
      service: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      date: "",
      time: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      notes: "",
    }
  }

  scrollToServices(): void {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  scrollToBooking(): void {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }
}
