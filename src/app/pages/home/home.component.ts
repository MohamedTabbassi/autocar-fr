import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  // Search form data
  searchParams = {
    startDate: this.formatDate(new Date()),
    endDate: this.formatDate(this.addDays(new Date(), 1)),
    startTime: "10:00",
    endTime: "10:00",
    location: "",
    returnLocation: "",
    differentReturn: false,
  }

  // Featured vehicles
  featuredVehicles = [
    {
      id: 1,
      name: "Volkswagen Golf",
      category: "Compacte",
      class: "C",
      seats: 5,
      transmission: "Manuelle",
      pricePerDay: 32,
      imageUrl: "assets/images/cars/golf.jpg",
    },
    {
      id: 2,
      name: "Renault Clio",
      category: "Économique",
      class: "A",
      seats: 5,
      transmission: "Manuelle",
      pricePerDay: 22,
      imageUrl: "assets/images/cars/clio.jpg",
    },
    {
      id: 3,
      name: "Peugeot 301",
      category: "Berline",
      class: "B",
      seats: 5,
      transmission: "Manuelle",
      pricePerDay: 20,
      imageUrl: "assets/images/cars/301.jpg",
    },
  ]

  // Testimonials
  testimonials = [
    {
      id: 1,
      name: "Ahmed K.",
      rating: 5,
      text: "Service exceptionnel ! Le mécanicien est venu directement chez moi et a réparé ma voiture en moins de 2 heures. J'ai économisé du temps et de l'argent.",
    },
    {
      id: 2,
      name: "Sophie M.",
      rating: 5,
      text: "Très pratique de ne pas avoir à se déplacer. Le service était professionnel et le prix bien inférieur à ce que je paie habituellement.",
    },
    {
      id: 3,
      name: "Karim B.",
      rating: 4,
      text: "J'étais sceptique au début, mais le service à domicile est vraiment pratique. Le mécanicien était compétent et a tout expliqué clairement.",
    },
  ]

  // Service categories
  serviceCategories = [
    { id: "filtres", name: "Filtres", icon: "assets/images/icons/filter.png" },
    { id: "freinage", name: "Freinage", icon: "assets/images/icons/brake.png" },
    { id: "courroie", name: "Courroie et chaîne", icon: "assets/images/icons/belt.png" },
    { id: "allumage", name: "Allumage", icon: "assets/images/icons/spark.png" },
    { id: "suspension", name: "Suspension", icon: "assets/images/icons/suspension.png" },
    { id: "direction", name: "Direction", icon: "assets/images/icons/steering.png" },
  ]

  // Locations
  locations = [
    { id: "tunis", name: "Aéroport Tunis Carthage" },
    { id: "carthage", name: "Tunis Centre" },
    { id: "sousse", name: "Sousse" },
    { id: "monastir", name: "Aéroport Monastir" },
    { id: "djerba", name: "Djerba" },
    { id: "enfidha", name: "Aéroport Enfidha" },
  ]

  constructor() {}

  ngOnInit(): void {}

  // Helper methods
  formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  searchVehicles(): void {
    // In a real app, this would navigate to the car rental page with search params
    console.log("Search params:", this.searchParams)
  }

  toggleDifferentReturn(): void {
    this.searchParams.differentReturn = !this.searchParams.differentReturn
    if (!this.searchParams.differentReturn) {
      this.searchParams.returnLocation = ""
    }
  }
}
