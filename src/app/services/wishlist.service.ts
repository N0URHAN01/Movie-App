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
      this.wishlistSubject.next(JSON.parse(savedWishlist));
    }
  }

  private saveWishlist(wishlist: any[]) {
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    this.wishlistSubject.next(wishlist);
  }

  addToWishlist(movie: any) {
    const currentWishlist = this.wishlistSubject.value;
    if (!this.isInWishlist(movie.id)) {
      this.saveWishlist([...currentWishlist, movie]);
    }
  }

  removeFromWishlist(movieId: number) {
    const currentWishlist = this.wishlistSubject.value;
    this.saveWishlist(currentWishlist.filter(movie => movie.id !== movieId));
  }

  isInWishlist(movieId: number): boolean {
    return this.wishlistSubject.value.some(movie => movie.id === movieId);
  }

  getWishlistCount(): number {
    return this.wishlistSubject.value.length;
  }
}
