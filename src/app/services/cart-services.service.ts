import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {
  private cart = new BehaviorSubject<{ id: number; quantity: number }[]>([]);
  private cartCount = new BehaviorSubject<number>(0);

 constructor() {
    this.loadCart(); // Load cart from localStorage when the service initializes
  }

  private loadCart() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart.next(storedCart);
    this.updateCartCounter(storedCart);
  }

  addToCart(item :number) {
    let cart = this.cart.value; // Get current cart

    const existingProduct = cart.find(p => p.id === item);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ id: item, quantity: 1 });
    }

    this.saveCart(cart);
  }

  removeFromCart(productId: number) {
    let cart = this.cart.value;
    cart = cart.filter(p => p.id !== productId); // Remove the item

    this.saveCart(cart);
  }

  getCart() {
    return this.cart.asObservable(); // Observable so components update automatically
  }

  getCartCount() {
    return this.cartCount.asObservable();
  }

  private saveCart(cart: { id: number;  quantity: number }[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart.next(cart); 
    this.updateCartCounter(cart);
  }

  private updateCartCounter(cart: { id: number; quantity: number }[]) {
    const totalQuantity = cart.length;
    this.cartCount.next(totalQuantity);
  }

}
