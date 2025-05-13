import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-auto-parts",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Pièces Auto</h1>
      <p>Cette page est en cours de développement.</p>
    </div>
  `,
  styles: [],
})
export class AutoPartsComponent {}
