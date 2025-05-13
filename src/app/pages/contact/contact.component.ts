import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Contact</h1>
      <p>Cette page est en cours de développement.</p>
    </div>
  `,
  styles: [],
})
export class ContactComponent {}
