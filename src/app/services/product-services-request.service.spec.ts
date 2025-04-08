import { TestBed } from '@angular/core/testing';

import { ProductServicesRequestService } from './product-services-request.service';

describe('ProductServicesRequestService', () => {
  let service: ProductServicesRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServicesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
