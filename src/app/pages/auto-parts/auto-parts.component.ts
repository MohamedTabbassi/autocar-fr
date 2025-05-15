import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-auto-parts",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./auto-parts.component.html",
  styleUrls: ["./auto-parts.component.css"]
})
export class AutoPartsComponent implements OnInit {
  loading = false
  error: string | null = null
  searchQuery = ""
  selectedCategory = ""
  cartCount = 0
  cart: any[] = []
  expandedCategory: string | null = null
  viewMode = "grid" // 'grid' or 'list'

  // Vehicle selection
  selectedManufacturer = ""
  selectedModel = ""
  selectedEngine = ""

  // Manufacturers
  manufacturers = [
    { id: "renault", name: "Renault" },
    { id: "peugeot", name: "Peugeot" },
    { id: "citroen", name: "Citroën" },
    { id: "volkswagen", name: "Volkswagen" },
    { id: "bmw", name: "BMW" },
    { id: "mercedes", name: "Mercedes" },
    { id: "audi", name: "Audi" },
    { id: "toyota", name: "Toyota" },
    { id: "ford", name: "Ford" },
    { id: "fiat", name: "Fiat" },
  ]

  // Models (would be filtered based on manufacturer in a real app)
  models = [
    { id: "clio", name: "Clio", manufacturer: "renault" },
    { id: "megane", name: "Megane", manufacturer: "renault" },
    { id: "208", name: "208", manufacturer: "peugeot" },
    { id: "308", name: "308", manufacturer: "peugeot" },
    { id: "c3", name: "C3", manufacturer: "citroen" },
    { id: "c4", name: "C4", manufacturer: "citroen" },
    { id: "golf", name: "Golf", manufacturer: "volkswagen" },
    { id: "polo", name: "Polo", manufacturer: "volkswagen" },
    { id: "serie3", name: "Série 3", manufacturer: "bmw" },
    { id: "serie5", name: "Série 5", manufacturer: "bmw" },
  ]

  // Engines (would be filtered based on model in a real app)
  engines = [
    { id: "1.5dci", name: "1.5 dCi", model: "clio" },
    { id: "1.2tce", name: "1.2 TCe", model: "clio" },
    { id: "1.6hdi", name: "1.6 HDi", model: "208" },
    { id: "1.2puretech", name: "1.2 PureTech", model: "208" },
    { id: "2.0tdi", name: "2.0 TDI", model: "golf" },
    { id: "1.4tsi", name: "1.4 TSI", model: "golf" },
  ]

  // Part categories
  partCategories = [
    { id: "filtres", name: "Filtres", icon: "assets/images/parts/filter-icon.png" },
    { id: "freinage", name: "Freinage", icon: "assets/images/parts/brake-icon.png" },
    { id: "courroie", name: "Courroie, tendeur et chaîne", icon: "assets/images/parts/belt-icon.png" },
    { id: "allumage", name: "Allumage", icon: "assets/images/parts/spark-icon.png" },
    { id: "suspension", name: "Suspension", icon: "assets/images/parts/suspension-icon.png" },
    { id: "direction", name: "Direction et Trains roulants", icon: "assets/images/parts/steering-icon.png" },
    { id: "embrayage", name: "Embrayage", icon: "assets/images/parts/clutch-icon.png" },
    { id: "moteur", name: "Moteur", icon: "assets/images/parts/engine-icon.png" },
    { id: "eclairage", name: "Éclairage", icon: "assets/images/parts/light-icon.png" },
    { id: "demarreur", name: "Démarreur et alternateur", icon: "assets/images/parts/starter-icon.png" },
    { id: "electronique", name: "Électronique", icon: "assets/images/parts/electronic-icon.png" },
    { id: "carrosserie", name: "Carrosserie", icon: "assets/images/parts/body-icon.png" },
  ]

  // Sample parts for the filtres category
  filtresParts = [
    {
      id: 1,
      name: "Filtre à huile MANN-FILTER HU7008z",
      reference: "HU7008z",
      compatibility: "BMW Série 3, Série 5",
      description: "Filtre à huile de qualité supérieure pour moteurs BMW",
      price: 12.99,
      inStock: true,
      imageUrl: "assets/images/parts/oil-filter.jpg",
      manufacturer: "MANN-FILTER",
      category: "filtres"
    },
    {
      id: 2,
      name: "Filtre à air MAHLE LX1566",
      reference: "LX1566",
      compatibility: "Volkswagen Golf, Audi A3",
      description: "Filtre à air haute performance pour moteurs du groupe VAG",
      price: 18.5,
      inStock: true,
      imageUrl: "assets/images/parts/air-filter.jpg",
      manufacturer: "MAHLE",
      category: "filtres"
    },
    {
      id: 3,
      name: "Filtre à carburant BOSCH F026402062",
      reference: "F026402062",
      compatibility: "Renault, Peugeot, Citroën",
      description: "Filtre à carburant pour moteurs diesel",
      price: 22.75,
      inStock: true,
      imageUrl: "assets/images/parts/fuel-filter.jpg",
      manufacturer: "BOSCH",
      category: "filtres"
    },
    {
      id: 4,
      name: "Filtre d'habitacle MANN-FILTER CUK2939",
      reference: "CUK2939",
      compatibility: "Mercedes Classe C, Classe E",
      description: "Filtre d'habitacle à charbon actif anti-allergènes",
      price: 24.99,
      inStock: true,
      imageUrl: "assets/images/parts/cabin-filter.jpg",
      manufacturer: "MANN-FILTER",
      category: "filtres"
    },
  ]

  // Sample parts for the freinage category
  freinageParts = [
    {
      id: 5,
      name: "Plaquettes de frein avant FERODO FDB1323",
      reference: "FDB1323",
      compatibility: "Renault Clio, Megane",
      description: "Plaquettes de frein haute performance pour un freinage optimal",
      price: 35.9,
      inStock: true,
      imageUrl: "assets/images/parts/brake-pads.jpg",
      manufacturer: "FERODO",
      category: "freinage"
    },
    {
      id: 6,
      name: "Disques de frein avant BREMBO 09.9772.10",
      reference: "09.9772.10",
      compatibility: "Peugeot 208, 308",
      description: "Disques de frein ventilés pour une meilleure dissipation de la chaleur",
      price: 78.5,
      inStock: true,
      imageUrl: "assets/images/parts/brake-discs.jpg",
      manufacturer: "BREMBO",
      category: "freinage"
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  // Get all parts
  get allParts() {
    return [...this.filtresParts, ...this.freinageParts]
  }

  // Get filtered parts based on category
  get filteredParts() {
    if (!this.selectedCategory) {
      return this.allParts
    }
    
    return this.allParts.filter(part => part.category === this.selectedCategory)
  }

  getFilteredModels() {
    if (!this.selectedManufacturer) return []
    return this.models.filter((model) => model.manufacturer === this.selectedManufacturer)
  }

  getFilteredEngines() {
    if (!this.selectedModel) return []
    return this.engines.filter((engine) => engine.model === this.selectedModel)
  }

  searchParts(): void {
    // In a real app, this would filter parts based on search query
    console.log("Searching for:", this.searchQuery)
  }

  searchByVehicle(): void {
    // In a real app, this would filter parts based on vehicle compatibility
    alert(
      `Recherche de pièces pour ${this.getManufacturerName(this.selectedManufacturer)} ${this.getModelName(
        this.selectedModel,
      )} ${this.getEngineName(this.selectedEngine)}`,
    )
  }

  getManufacturerName(id: string): string {
    const manufacturer = this.manufacturers.find((m) => m.id === id)
    return manufacturer ? manufacturer.name : ""
  }

  getModelName(id: string): string {
    const model = this.models.find((m) => m.id === id)
    return model ? model.name : ""
  }

  getEngineName(id: string): string {
    const engine = this.engines.find((e) => e.id === id)
    return engine ? engine.name : ""
  }

  addToCart(part: any): void {
    this.cart.push(part)
    this.cartCount = this.cart.length
    alert(`${part.name} ajouté au panier!`)
  }

  getCategoryName(): string {
    if (!this.selectedCategory) return "Pièces auto"
    const category = this.partCategories.find((c) => c.id === this.selectedCategory)
    return category?.name || "Pièces auto"
  }

  getCartTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0)
  }

  getCartCountText(): string {
    return `${this.cart.length} article${this.cart.length > 1 ? "s" : ""}`
  }

  resetCategory(): void {
    this.selectedCategory = ""
  }

  toggleCategory(categoryId: string): void {
    if (this.expandedCategory === categoryId) {
      this.expandedCategory = null
    } else {
      this.expandedCategory = categoryId
      this.selectedCategory = categoryId
    }
  }

  setViewMode(mode: string): void {
    this.viewMode = mode
  }
}
