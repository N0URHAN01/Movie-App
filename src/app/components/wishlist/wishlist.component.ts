import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist$: Observable<any[]>;
  hasItems = false;

  constructor(private wishlistService: WishlistService) {
    this.wishlist$ = this.wishlistService.wishlist$;
  }

  ngOnInit() {
    this.wishlist$.subscribe(items => {
      this.hasItems = items.length > 0;
    });
  }

  removeFromWishlist(movieId: number) {
    this.wishlistService.removeFromWishlist(movieId);
  }
}
