import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsRequestsService {
  http = inject(HttpClient);
  constructor() {}

  getProductsList(): Observable<any> {
    return this.http.get(`${environment.baseURL}/products`, {

      headers: {
        Authorization: 'ACCESS_TOKEN_FROM_API',
      },
    });
  }

  getProductDetails(id: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }

  addProduct(data: any) {
    return this.http.post(`https://dummyjson.com/products/add`, data, {
      headers: {},
    });
  }
}
