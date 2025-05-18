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
  selectedCategory: string | null = null
  cartCount = 0
  cart: any[] = []
  expandedCategory: string | null = null
  viewMode: 'grid' | 'list' = 'grid'

  // Vehicle selection
  selectedManufacturer: string | null = null
  selectedModel: string | null = null
  selectedEngine: string | null = null

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

  // Models
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

  // Engines
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
    {
      id: 7,
      name: "Kit de frein arrière BOSCH 0 986 424 363",
      reference: "0 986 424 363",
      compatibility: "Skoda Fabia, Ford Fiesta",
      description: "Kit de frein arrière pour une performance de freinage équilibrée",
      price: 45.0,
      inStock: true,
      imageUrl: "assets/images/parts/rear-brake-kit.jpg",
      manufacturer: "BOSCH",
      category: "freinage"
    }
  ]

  // Courroie, Tendeur et Chaîne (Belts, Tensioners, and Chains)
  courroieParts = [
    {
      id: 8,
      name: "Kit de courroie de distribution GATES K015611XS",
      reference: "K015611XS",
      compatibility: "Hyundai i10, Suzuki Swift",
      description: "Kit complet incluant courroie et tendeur pour une distribution fiable",
      price: 65.0,
      inStock: true,
      imageUrl: "assets/images/parts/timing-belt-kit.jpg",
      manufacturer: "GATES",
      category: "courroie"
    },
    {
      id: 9,
      name: "Tendeur de courroie SKF VKM 13140",
      reference: "VKM 13140",
      compatibility: "Seat Ibiza, Volkswagen Polo",
      description: "Tendeur robuste pour maintenir la tension optimale de la courroie",
      price: 32.5,
      inStock: true,
      imageUrl: "assets/images/parts/belt-tensioner.jpg",
      manufacturer: "SKF",
      category: "courroie"
    },
    {
      id: 10,
      name: "Chaîne de distribution FEBI BILSTEIN 25221",
      reference: "25221",
      compatibility: "BMW Serie 3, Skoda Octavia",
      description: "Chaîne de distribution durable pour moteurs haute performance",
      price: 95.0,
      inStock: false,
      imageUrl: "assets/images/parts/timing-chain.jpg",
      manufacturer: "FEBI BILSTEIN",
      category: "courroie"
    }
  ]

  // Allumage (Ignition)
  allumageParts = [
    {
      id: 11,
      name: "Bougies d'allumage NGK BKR6EZ",
      reference: "BKR6EZ",
      compatibility: "Suzuki Swift, Ford Fiesta",
      description: "Bougies d'allumage pour une combustion efficace",
      price: 8.5,
      inStock: true,
      imageUrl: "assets/images/parts/spark-plugs.jpg",
      manufacturer: "NGK",
      category: "allumage"
    },
    {
      id: 12,
      name: "Bobine d'allumage BOSCH 0 221 504 029",
      reference: "0 221 504 029",
      compatibility: "Renault Megane, Citroen C3",
      description: "Bobine d'allumage pour une étincelle fiable",
      price: 45.0,
      inStock: true,
      imageUrl: "assets/images/parts/ignition-coil.jpg",
      manufacturer: "BOSCH",
      category: "allumage"
    },
    {
      id: 13,
      name: "Câble d'allumage VALEO 346391",
      reference: "346391",
      compatibility: "Hyundai i10, Peugeot 301",
      description: "Câbles d'allumage pour une transmission optimale de l'énergie",
      price: 20.0,
      inStock: true,
      imageUrl: "assets/images/parts/ignition-cables.jpg",
      manufacturer: "VALEO",
      category: "allumage"
    }
  ]

  // Suspension
  suspensionParts = [
    {
      id: 14,
      name: "Amortisseur avant MONROE G16327",
      reference: "G16327",
      compatibility: "Ford EcoSport, Volkswagen Golf",
      description: "Amortisseur avant pour un confort de conduite optimal",
      price: 60.0,
      inStock: true,
      imageUrl: "assets/images/parts/shock-absorber.jpg",
      manufacturer: "MONROE",
      category: "suspension"
    },
    {
      id: 15,
      name: "Ressort de suspension SACHS 993 040",
      reference: "993 040",
      compatibility: "Seat Ibiza, Skoda Fabia",
      description: "Ressort de suspension pour une stabilité accrue",
      price: 35.0,
      inStock: true,
      imageUrl: "assets/images/parts/suspension-spring.jpg",
      manufacturer: "SACHS",
      category: "suspension"
    },
    {
      id: 16,
      name: "Kit de suspension BILSTEIN B4",
      reference: "B4-123456",
      compatibility: "BMW Serie 3, Renault Kangoo",
      description: "Kit de suspension pour une tenue de route améliorée",
      price: 150.0,
      inStock: true,
      imageUrl: "assets/images/parts/suspension-kit.jpg",
      manufacturer: "BILSTEIN",
      category: "suspension"
    }
  ]

  // Direction et Trains Roulants (Steering and Running Gear)
  directionParts = [
    {
      id: 17,
      name: "Rotule de direction TRW JTE216",
      reference: "JTE216",
      compatibility: "Citroen C3, Peugeot 301",
      description: "Rotule de direction pour une maniabilité précise",
      price: 15.0,
      inStock: true,
      imageUrl: "assets/images/parts/tie-rod-end.jpg",
      manufacturer: "TRW",
      category: "direction"
    },
    {
      id: 18,
      name: "Biellette de barre stabilisatrice MOOG VO-LS-0493",
      reference: "VO-LS-0493",
      compatibility: "Volkswagen Polo, Skoda Octavia",
      description: "Biellette pour réduire le roulis et améliorer la stabilité",
      price: 20.0,
      inStock: true,
      imageUrl: "assets/images/parts/stabilizer-link.jpg",
      manufacturer: "MOOG",
      category: "direction"
    },
    {
      id: 19,
      name: "Pompe de direction assistée BOSCH K S00 000 654",
      reference: "K S00 000 654",
      compatibility: "Ford Fiesta, Renault Megane",
      description: "Pompe de direction assistée pour une conduite fluide",
      price: 120.0,
      inStock: true,
      imageUrl: "assets/images/parts/power-steering-pump.jpg",
      manufacturer: "BOSCH",
      category: "direction"
    }
  ]

  // Embrayage (Clutch)
  embrayageParts = [
    {
      id: 20,
      name: "Kit d'embrayage VALEO 826317",
      reference: "826317",
      compatibility: "Renault Kangoo, Ford Fiesta",
      description: "Kit d'embrayage complet pour une transmission fluide",
      price: 120.0,
      inStock: true,
      imageUrl: "assets/images/parts/clutch-kit.jpg",
      manufacturer: "VALEO",
      category: "embrayage"
    },
    {
      id: 21,
      name: "Butée d'embrayage LUK 500 1050 10",
      reference: "500 1050 10",
      compatibility: "Hyundai i10, Suzuki Swift",
      description: "Butée d'embrayage pour un désengagement précis",
      price: 25.0,
      inStock: true,
      imageUrl: "assets/images/parts/clutch-release-bearing.jpg",
      manufacturer: "LUK",
      category: "embrayage"
    },
    {
      id: 22,
      name: "Volant moteur SACHS 2294 001 244",
      reference: "2294 001 244",
      compatibility: "Volkswagen Golf, Skoda Octavia",
      description: "Volant moteur pour réduire les vibrations",
      price: 200.0,
      inStock: false,
      imageUrl: "assets/images/parts/flywheel.jpg",
      manufacturer: "SACHS",
      category: "embrayage"
    }
  ]

  // Moteur (Engine)
  moteurParts = [
    {
      id: 23,
      name: "Filtre à huile BOSCH 0 451 103 318",
      reference: "0 451 103 318",
      compatibility: "BMW Serie 3, Renault Megane",
      description: "Filtre à huile pour une lubrification propre du moteur",
      price: 10.0,
      inStock: true,
      imageUrl: "assets/images/parts/oil-filter.jpg",
      manufacturer: "BOSCH",
      category: "moteur"
    },
    {
      id: 24,
      name: "Pompe à eau GRAF PA947",
      reference: "PA947",
      compatibility: "Volkswagen Golf, Ford EcoSport",
      description: "Pompe à eau pour un refroidissement efficace du moteur",
      price: 55.0,
      inStock: true,
      imageUrl: "assets/images/parts/water-pump.jpg",
      manufacturer: "GRAF",
      category: "moteur"
    },
    {
      id: 25,
      name: "Joint de culasse ELRING 123.456",
      reference: "123.456",
      compatibility: "Peugeot 301, Citroen C3",
      description: "Joint de culasse pour une étanchéité parfaite du moteur",
      price: 40.0,
      inStock: true,
      imageUrl: "assets/images/parts/head-gasket.jpg",
      manufacturer: "ELRING",
      category: "moteur"
    }
  ]

  // Éclairage (Lighting)
  eclairageParts = [
    {
      id: 26,
      name: "Phare avant VALEO 043013",
      reference: "043013",
      compatibility: "Peugeot 301, Citroen C3",
      description: "Phare avant pour une visibilité optimale de nuit",
      price: 85.0,
      inStock: true,
      imageUrl: "assets/images/parts/headlight.jpg",
      manufacturer: "VALEO",
      category: "eclairage"
    },
    {
      id: 27,
      name: "Ampoule H7 PHILIPS 12972PRC1",
      reference: "12972PRC1",
      compatibility: "Skoda Octavia, Ford Fiesta",
      description: "Ampoule H7 pour un éclairage puissant et durable",
      price: 12.0,
      inStock: true,
      imageUrl: "assets/images/parts/headlight-bulb.jpg",
      manufacturer: "PHILIPS",
      category: "eclairage"
    },
    {
      id: 28,
      name: "Feu arrière TYC 11-1234-01-2",
      reference: "11-1234-01-2",
      compatibility: "Seat Ibiza, Hyundai i10",
      description: "Feu arrière pour une signalisation claire",
      price: 50.0,
      inStock: true,
      imageUrl: "assets/images/parts/tail-light.jpg",
      manufacturer: "TYC",
      category: "eclairage"
    }
  ]

  // Démarreur et Alternateur (Starter and Alternator)
  demarreurParts = [
    {
      id: 29,
      name: "Démarreur BOSCH 0 001 107 401",
      reference: "0 001 107 401",
      compatibility: "Renault Kangoo, Volkswagen Polo",
      description: "Démarreur robuste pour un démarrage fiable",
      price: 110.0,
      inStock: true,
      imageUrl: "assets/images/parts/starter.jpg",
      manufacturer: "BOSCH",
      category: "demarreur"
    },
    {
      id: 30,
      name: "Alternateur VALEO 437400",
      reference: "437400",
      compatibility: "Suzuki Swift, Hyundai i10",
      description: "Alternateur pour une alimentation électrique stable",
      price: 150.0,
      inStock: true,
      imageUrl: "assets/images/parts/alternator.jpg",
      manufacturer: "VALEO",
      category: "demarreur"
    },
    {
      id: 31,
      name: "Régulateur d'alternateur BOSCH F 00M 145 225",
      reference: "F 00M 145 225",
      compatibility: "Ford EcoSport, Skoda Fabia",
      description: "Régulateur pour maintenir une tension constante",
      price: 35.0,
      inStock: true,
      imageUrl: "assets/images/parts/alternator-regulator.jpg",
      manufacturer: "BOSCH",
      category: "demarreur"
    }
  ]

  // Électronique (Electronics)
  electroniqueParts = [
    {
      id: 32,
      name: "Capteur ABS DELPHI SS20007",
      reference: "SS20007",
      compatibility: "Ford EcoSport, Seat Ibiza",
      description: "Capteur ABS pour un contrôle précis du freinage",
      price: 30.0,
      inStock: true,
      imageUrl: "assets/images/parts/abs-sensor.jpg",
      manufacturer: "DELPHI",
      category: "electronique"
    },
    {
      id: 33,
      name: "Calculateur moteur BOSCH 0 281 010 123",
      reference: "0 281 010 123",
      compatibility: "BMW Serie 3, Renault Megane",
      description: "Calculateur moteur pour une gestion optimale des performances",
      price: 250.0,
      inStock: false,
      imageUrl: "assets/images/parts/ecu.jpg",
      manufacturer: "BOSCH",
      category: "electronique"
    },
    {
      id: 34,
      name: "Capteur de vilebrequin NGK 81376",
      reference: "81376",
      compatibility: "Volkswagen Golf, Peugeot 301",
      description: "Capteur de vilebrequin pour un timing précis du moteur",
      price: 40.0,
      inStock: true,
      imageUrl: "assets/images/parts/crankshaft-sensor.jpg",
      manufacturer: "NGK",
      category: "electronique"
    }
  ]

  // Carrosserie (Bodywork)
  carrosserieParts = [
    {
      id: 35,
      name: "Pare-chocs avant PRASCO VG2001011",
      reference: "VG2001011",
      compatibility: "Volkswagen Golf, Skoda Fabia",
      description: "Pare-chocs avant pour une protection et un style améliorés",
      price: 95.0,
      inStock: true,
      imageUrl: "assets/images/parts/front-bumper.jpg",
      manufacturer: "PRASCO",
      category: "carrosserie"
    },
    {
      id: 36,
      name: "Rétroviseur extérieur TYC 337-0019",
      reference: "337-0019",
      compatibility: "Citroen C3, Peugeot 301",
      description: "Rétroviseur extérieur électrique avec clignotant intégré",
      price: 65.0,
      inStock: true,
      imageUrl: "assets/images/parts/side-mirror.jpg",
      manufacturer: "TYC",
      category: "carrosserie"
    },
    {
      id: 37,
      name: "Capot moteur DIEDERICHS 1234567",
      reference: "1234567",
      compatibility: "Ford Fiesta, Renault Kangoo",
      description: "Capot moteur pour une protection robuste",
      price: 120.0,
      inStock: true,
      imageUrl: "assets/images/parts/hood.jpg",
      manufacturer: "DIEDERICHS",
      category: "carrosserie"
    }
  ]

  constructor() {}

  ngOnInit(): void {
    // Initialize with default data
    this.loadParts()
  }

  loadParts(): void {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }

  // Get all parts
  get allParts(): any[] {
    return [
      ...this.filtresParts,
      ...this.freinageParts,
      ...this.courroieParts,
      ...this.allumageParts,
      ...this.suspensionParts,
      ...this.directionParts,
      ...this.embrayageParts,
      ...this.moteurParts,
      ...this.eclairageParts,
      ...this.demarreurParts,
      ...this.electroniqueParts,
      ...this.carrosserieParts
    ]
  }

  // Get filtered parts based on category, search, and vehicle
  get filteredParts(): any[] {
    let parts = this.allParts

    // Filter by category
    if (this.selectedCategory) {
      parts = parts.filter(part => part.category === this.selectedCategory)
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      parts = parts.filter(part =>
        part.reference.toLowerCase().includes(query) ||
        part.name.toLowerCase().includes(query)
      )
    }

    // Filter by vehicle
    if (this.selectedModel) {
      const modelName = this.models.find(model => model.id === this.selectedModel)?.name
      if (modelName) {
        parts = parts.filter(part => part.compatibility.includes(modelName))
      }
    }

    return parts
  }

  getFilteredModels(): any[] {
    if (!this.selectedManufacturer) return []
    return this.models.filter((model) => model.manufacturer === this.selectedManufacturer)
  }

  getFilteredEngines(): any[] {
    if (!this.selectedModel) return []
    return this.engines.filter((engine) => engine.model === this.selectedModel)
  }

  searchParts(): void {
    if (!this.searchQuery) {
      this.error = "Veuillez entrer une référence ou un nom de pièce"
      setTimeout(() => this.error = null, 3000)
      return
    }
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }

  searchByVehicle(): void {
    if (!this.selectedManufacturer || !this.selectedModel) {
      this.error = "Veuillez sélectionner un constructeur et un modèle"
      setTimeout(() => this.error = null, 3000)
      return
    }
    alert(
      `Recherche de pièces pour ${this.getManufacturerName(this.selectedManufacturer)} ${this.getModelName(
        this.selectedModel,
      )} ${this.getEngineName(this.selectedEngine)}`
    )
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }

  getManufacturerName(id: string | null): string {
    const manufacturer = this.manufacturers.find((m) => m.id === id)
    return manufacturer ? manufacturer.name : ""
  }

  getModelName(id: string | null): string {
    const model = this.models.find((m) => m.id === id)
    return model ? model.name : ""
  }

  getEngineName(id: string | null): string {
    const engine = this.engines.find((e) => e.id === id)
    return engine ? engine.name : ""
  }

  addToCart(part: any): void {
    this.cart.push(part)
    this.cartCount = this.cart.length
    alert(`${part.name} ajouté au panier !`)
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
    this.selectedCategory = null
    this.expandedCategory = null
  }

  toggleCategory(categoryId: string): void {
    if (this.expandedCategory === categoryId) {
      this.expandedCategory = null
    } else {
      this.expandedCategory = categoryId
      this.selectedCategory = categoryId
    }
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode
  }
}