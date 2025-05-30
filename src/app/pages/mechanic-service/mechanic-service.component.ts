import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-mechanic-service",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./mechanic-service.component.html",
  styleUrls: ["./mechanic-service.component.css"],
})
export class MechanicServiceComponent implements OnInit {
  loading = false;
  error: string | null = null;
  selectedCategory = "";

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
  };

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
  ];

  // Expanded mechanic services
  mechanicServices = [
    // Entretien régulier (maintenance)
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
      name: "Rotation et équilibrage des pneus",
      description: "Rotation des pneus pour une usure uniforme et équilibrage pour une conduite fluide.",
      price: 39.99,
      category: "maintenance",
      duration: "45 min",
      warranty: "N/A",
      imageUrl: "assets/images/services/tire-rotation.jpg",
    },
    {
      id: 3,
      name: "Remplacement du filtre à air",
      description: "Remplacement du filtre à air pour améliorer les performances du moteur.",
      price: 29.99,
      category: "maintenance",
      duration: "20-30 min",
      warranty: "3 mois",
      imageUrl: "assets/images/services/air-filter.jpg",
    },
    {
      id: 4,
      name: "Contrôle des liquides et appoint",
      description: "Vérification et appoint des liquides (frein, direction assistée, lave-glace, etc.).",
      price: 19.99,
      category: "maintenance",
      duration: "15-20 min",
      warranty: "N/A",
      imageUrl: "assets/images/services/fluid-check.jpg",
    },

    // Réparation (repair)
    {
      id: 5,
      name: "Réparation de l'échappement",
      description: "Réparation ou remplacement des sections endommagées du système d'échappement.",
      price: 129.99,
      category: "repair",
      duration: "1-2 heures",
      warranty: "1 an",
      imageUrl: "assets/images/services/exhaust-repair.jpg",
    },
    {
      id: 6,
      name: "Remplacement de la courroie de distribution",
      description: "Remplacement de la courroie de distribution pour éviter les pannes moteur.",
      price: 299.99,
      category: "repair",
      duration: "3-4 heures",
      warranty: "2 ans",
      imageUrl: "assets/images/services/timing-belt.jpg",
    },
    {
      id: 7,
      name: "Réparation de la climatisation",
      description: "Diagnostic et réparation du système de climatisation avec recharge de gaz.",
      price: 99.99,
      category: "repair",
      duration: "1-2 heures",
      warranty: "6 mois",
      imageUrl: "assets/images/services/ac-repair.jpg",
    },

    // Diagnostic (diagnostic)
    {
      id: 8,
      name: "Diagnostic électronique complet",
      description: "Analyse complète des systèmes électroniques du véhicule avec rapport détaillé.",
      price: 49.99,
      category: "diagnostic",
      duration: "30-45 min",
      warranty: "N/A",
      imageUrl: "assets/images/services/diagnostic.jpg",
    },
    {
      id: 9,
      name: "Diagnostic des performances moteur",
      description: "Analyse des performances moteur pour identifier les problèmes de puissance ou de consommation.",
      price: 59.99,
      category: "diagnostic",
      duration: "45 min",
      warranty: "N/A",
      imageUrl: "assets/images/services/engine-diagnostic.jpg",
    },
    {
      id: 10,
      name: "Diagnostic des systèmes de freinage",
      description: "Vérification électronique et mécanique des freins pour assurer la sécurité.",
      price: 39.99,
      category: "diagnostic",
      duration: "30 min",
      warranty: "N/A",
      imageUrl: "assets/images/services/brake-diagnostic.jpg",
    },

    // Suspension et direction (suspension)
    {
      id: 11,
      name: "Remplacement d'amortisseurs",
      description: "Remplacement des amortisseurs avant ou arrière pour améliorer la tenue de route.",
      price: 199.99,
      category: "suspension",
      duration: "2-3 heures",
      warranty: "2 ans",
      imageUrl: "assets/images/services/suspension.jpg",
    },
    {
      id: 12,
      name: "Remplacement des biellettes de direction",
      description: "Remplacement des biellettes pour une direction plus précise.",
      price: 79.99,
      category: "suspension",
      duration: "1-2 heures",
      warranty: "1 an",
      imageUrl: "assets/images/services/steering-link.jpg",
    },
    {
      id: 13,
      name: "Alignement des roues",
      description: "Réglage de l'alignement des roues pour éviter une usure prématurée des pneus.",
      price: 69.99,
      category: "suspension",
      duration: "1 heure",
      warranty: "N/A",
      imageUrl: "assets/images/services/wheel-alignment.jpg",
    },

    // Freins (brakes)
    {
      id: 14,
      name: "Remplacement des plaquettes de frein",
      description: "Remplacement des plaquettes de frein avant ou arrière avec vérification des disques.",
      price: 89.99,
      category: "brakes",
      duration: "1-2 heures",
      warranty: "1 an",
      imageUrl: "assets/images/services/brake-pads.jpg",
    },
    {
      id: 15,
      name: "Remplacement des disques de frein",
      description: "Remplacement des disques de frein pour améliorer la performance de freinage.",
      price: 149.99,
      category: "brakes",
      duration: "1-2 heures",
      warranty: "1 an",
      imageUrl: "assets/images/services/brake-discs.jpg",
    },
    {
      id: 16,
      name: "Purge du liquide de frein",
      description: "Remplacement du liquide de frein pour maintenir un freinage optimal.",
      price: 49.99,
      category: "brakes",
      duration: "30-45 min",
      warranty: "6 mois",
      imageUrl: "assets/images/services/brake-fluid.jpg",
    },

    // Moteur (engine)
    {
      id: 17,
      name: "Remplacement de la pompe à eau",
      description: "Remplacement de la pompe à eau pour éviter les surchauffes moteur.",
      price: 159.99,
      category: "engine",
      duration: "2-3 heures",
      warranty: "1 an",
      imageUrl: "assets/images/services/water-pump.jpg",
    },
    {
      id: 18,
      name: "Réparation du joint de culasse",
      description: "Réparation ou remplacement du joint de culasse pour éviter les fuites.",
      price: 499.99,
      category: "engine",
      duration: "4-6 heures",
      warranty: "2 ans",
      imageUrl: "assets/images/services/head-gasket.jpg",
    },
    {
      id: 19,
      name: "Remplacement des bougies d'allumage",
      description: "Remplacement des bougies pour améliorer la combustion moteur.",
      price: 79.99,
      category: "engine",
      duration: "1 heure",
      warranty: "6 mois",
      imageUrl: "assets/images/services/spark-plugs.jpg",
    },

    // Système électrique (electrical)
    {
      id: 20,
      name: "Remplacement de la batterie",
      description: "Remplacement de la batterie avec test du système de charge.",
      price: 99.99,
      category: "electrical",
      duration: "30 min",
      warranty: "2 ans",
      imageUrl: "assets/images/services/battery-replacement.jpg",
    },
    {
      id: 21,
      name: "Réparation de l'alternateur",
      description: "Réparation ou remplacement de l'alternateur pour assurer une charge correcte.",
      price: 179.99,
      category: "electrical",
      duration: "1-2 heures",
      warranty: "1 an",
      imageUrl: "assets/images/services/alternator-repair.jpg",
    },
    {
      id: 22,
      name: "Remplacement des fusibles",
      description: "Diagnostic et remplacement des fusibles défectueux.",
      price: 29.99,
      category: "electrical",
      duration: "20-30 min",
      warranty: "3 mois",
      imageUrl: "assets/images/services/fuse-replacement.jpg",
    },

    // Service à domicile (mobile)
    {
      id: 23,
      name: "Vidange d'huile à domicile",
      description: "Changement d'huile et remplacement du filtre directement chez vous.",
      price: 89.99,
      category: "mobile",
      duration: "45 min",
      warranty: "3 mois",
      imageUrl: "assets/images/services/mobile-oil-change.jpg",
    },
    {
      id: 24,
      name: "Remplacement de batterie à domicile",
      description: "Remplacement de la batterie avec test sur place.",
      price: 129.99,
      category: "mobile",
      duration: "30 min",
      warranty: "2 ans",
      imageUrl: "assets/images/services/mobile-battery.jpg",
    },
    {
      id: 25,
      name: "Diagnostic de base à domicile",
      description: "Diagnostic rapide des problèmes courants directement chez vous.",
      price: 69.99,
      category: "mobile",
      duration: "30 min",
      warranty: "N/A",
      imageUrl: "assets/images/services/mobile-diagnostic.jpg",
    },
  ];

constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    // Simulate API call with a timeout
    setTimeout(() => {
      this.loading = false;
    }, 1000); // Mock 1-second loading
  }

  // Get filtered services based on category
  get filteredServices() {
    return this.selectedCategory
      ? this.mechanicServices.filter((service) => service.category === this.selectedCategory)
      : this.mechanicServices;
  }

  handleInputChange(event: Event): void {
    const element = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value } = element;
    this.appointmentRequest = {
      ...this.appointmentRequest,
      [name]: value,
    };
  }

  bookAppointment(event: Event): void {
event.preventDefault();
this.loading = true;

this.http.post('http://localhost:3001/api/appointments', this.appointmentRequest).subscribe({
next: () => {
alert("Rendez-vous envoyé avec succès !");
this.loading = false;
// reset form here...
},
error: (err) => {
console.error("Erreur:", err);
this.loading = false;
alert("Erreur lors de l'envoi du rendez-vous.");
}
});
}

  handleRadioChange(value: string): void {
    this.appointmentRequest = {
      ...this.appointmentRequest,
      serviceLocation: value,
    };
  }

  

  reserveService(service: any): void {
    console.log('reserveService called with service:', service);

    // Pre-fill the appointment form with the selected service
    this.appointmentRequest.serviceType = service.category;

    // Scroll to the appointment section after a slight delay to ensure DOM is ready
    setTimeout(() => {
      const appointmentSection = document.querySelector('.appointment-section');
      if (appointmentSection) {
        console.log('Scrolling to appointment section...');
        appointmentSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error('Appointment section not found in the DOM.');
      }
    }, 0);
  }

  setCategory(category: string): void {
    this.selectedCategory = category === this.selectedCategory ? "" : category;
  }
}