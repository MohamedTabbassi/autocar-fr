import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  
  contactForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  
  formMessage: string | null = null;

  constructor(private apiService: ApiService) {} 

  // Handle form submission
  submitContactForm(event: Event): void {
    event.preventDefault();
    console.log('Submitting form...', this.contactForm);
const url = '${this.apiUrl}/contact';
    // Basic validation
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      this.formMessage = "Veuillez remplir tous les champs obligatoires.";
      setTimeout(() => (this.formMessage = null), 3000);
      return;
    }

    // Send form data to backend via ApiService
    this.apiService.submitContactForm(this.contactForm).subscribe({
      next: (response) => {
        this.formMessage = "Message envoyé avec succès ! Nous vous répondrons bientôt.";
        // Reset form
        this.contactForm = {
          name: "",
          email: "",
          subject: "",
          message: "",
        };
        setTimeout(() => (this.formMessage = null), 3000);
      },
      error: (error) => {
        this.formMessage = error.message || "Erreur lors de l'envoi du message. Veuillez réessayer.";
        setTimeout(() => (this.formMessage = null), 3000);
      },
    });
  }
}