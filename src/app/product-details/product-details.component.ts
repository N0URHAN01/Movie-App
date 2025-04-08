import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgClass } from '@angular/common';
import { CartServicesService } from '../services/cart-services.service';
import { Product } from '../types/product';
import { DiscountPipe } from '../pipes/discount.pipe';
import { ProductServicesRequestService } from '../services/product-services-request.service';


@Component({
  selector: 'app-product-details',
  imports: [NgClass, DiscountPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})

export class ProductdetailsComponent {
  products!: Product[];
  selectedImageIndex: number = 0;
  isLoading: boolean = true;
  quantity: number = 0;
  cartService = inject(CartServicesService)
  productService= inject(ProductServicesRequestService);
  constructor(private _actvRoute: ActivatedRoute) {
  }
    product : any;
  ngOnInit() {
    return this.productService.getProductDetails(this._actvRoute.snapshot.params["id"]).subscribe((data) => {
      this.product = data;
      this.isLoading = false;
    });
  }

  changeMainImage(index: number){
    this.selectedImageIndex = index;
  }

  increaseQuantity(){
    if(this.quantity < this.product.stock) this.quantity++;
  }
  decreaseQuantity(){
    if(this.quantity > 0) this.quantity--;
  }

  get inStock() {
    return this.product!.stock <= 0 ? false : true;
  }
  get stars() {
    const arrayRange = (start: number, stop: number, step: number) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
      );
    return arrayRange(1, this.product.rating, 1);
  }
  addToCart(product: number) {
    this.cartService.addToCart(product); // ✅ Triggers cart update in header
  }
}