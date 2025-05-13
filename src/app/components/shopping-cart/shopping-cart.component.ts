import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
@Component({
  selector: "app-shopping-cart",
  imports:[CommonModule],
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = []

  constructor() {}

  ngOnInit(): void {
    // In a real app, you would get cart items from a service
    this.loadCartItems()
  }

  loadCartItems(): void {
    // Mock data for demonstration
    this.cartItems = [
      {
        id: 1,
        name: "Filtre à huile MANN-FILTER HU7008z",
        reference: "HU7008z",
        price: 12.99,
        quantity: 1,
        imageUrl: "assets/images/parts/filter.jpg",
      },
      {
        id: 5,
        name: "Plaquettes de frein avant FERODO FDB1323",
        reference: "FDB1323",
        price: 35.9,
        quantity: 2,
        imageUrl: "assets/images/parts/brake-pads.jpg",
      },
    ]
  }

  updateQuantity(item: any, newQuantity: number): void {
    if (newQuantity < 1) return

    const index = this.cartItems.findIndex((cartItem) => cartItem.id === item.id)
    if (index !== -1) {
      this.cartItems[index].quantity = newQuantity
    }
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId)
  }

  clearCart(): void {
    this.cartItems = []
  }

  getItemTotal(item: any): number {
    return item.price * item.quantity
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + this.getItemTotal(item), 0)
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  checkout(): void {
    // In a real app, this would navigate to checkout page
    console.log("Proceeding to checkout with items:", this.cartItems)
  }
}
