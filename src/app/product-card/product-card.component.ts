import { Component, EventEmitter, Input , Output } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() productItem : any;
  @Output() sendToParent = new EventEmitter<number>();

  handleDeleteProduct(){
    console.log(this.productItem.id)
    this.sendToParent.emit(this.productItem.id)
  }

isInWishlist(movieId: number): boolean {
  return this.wishlistService.isInWishlist(movieId);
}

toggleWishlist(movie: any) {
  if (this.isInWishlist(movie.id)) {
    this.wishlistService.removeFromWishlist(movie.id);
  } else {
    this.wishlistService.addToWishlist(movie);
  }
}
}



// SHARING DATA FROM PARENT TO CHILD
// PARENT HTML -> <child-selector [property]="value"> </child-selector>
// CHILD.TS -> @Input() property : TYPE ;

// SHARING DATA FROM CHILD TO PARENT
// CHILD.TS -> @Output() emitterInstanceEvent = new EventEmitter<TYPE>();
// CHILD.TS -> this.emitterInstanceEvent.emit(value)

// PARENT.HTML-> <child-selector (emitterInstanceEvent)="parentFunction($event)"> </child-selector>