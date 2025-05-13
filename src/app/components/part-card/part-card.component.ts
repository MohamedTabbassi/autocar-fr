import { Component, Input, Output, EventEmitter } from "@angular/core"

@Component({
  selector: "app-part-card",
  templateUrl: "./part-card.component.html",
  styleUrls: ["./part-card.component.css"],
})
export class PartCardComponent {
  @Input() part: any
  @Output() addToCart = new EventEmitter<any>()

  onAddToCart(): void {
    this.addToCart.emit(this.part)
  }
}
