import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../types/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductServicesRequestService {
  http = inject(HttpClient);
  products!: Product[];
  constructor() {}

  getProductsList(): Observable<any> {
    return  this.http.get('https://dummyjson.com/products');
  }

  getProductDetails(id: number): Observable<any> {
    return  this.http.get(`https://dummyjson.com/products/${id}`);
  }
}
