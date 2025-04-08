import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistKey = 'movieWishlist';
  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    this.loadWishlist();
  }

  private loadWishlist() {
    const savedWishlist = localStorage.getItem(this.wishlistKey);
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);
      this.wishlistSubject.next(wishlist);
    }
  }

  private saveWishlist(wishlist: any[]) {
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    this.wishlistSubject.next(wishlist);
  }

  addToWishlist(movie: any) {
    const currentWishlist = this.wishlistSubject.value;
    if (!this.isInWishlist(movie.id)) {
      const updatedWishlist = [...currentWishlist, movie];
      this.saveWishlist(updatedWishlist);
      return true;
    }
    return false;
  }

  removeFromWishlist(movieId: number) {
    const currentWishlist = this.wishlistSubject.value;
    const updatedWishlist = currentWishlist.filter(movie => movie.id !== movieId);
    this.saveWishlist(updatedWishlist);
    return true;
  }

  isInWishlist(movieId: number): boolean {
    return this.wishlistSubject.value.some(movie => movie.id === movieId);
  }

  getWishlistCount(): number {
    return this.wishlistSubject.value.length;
  }

  getWishlist(): any[] {
    return this.wishlistSubject.value;
  }
}
