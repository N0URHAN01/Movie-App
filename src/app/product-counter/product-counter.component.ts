import { Component, inject } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-product-counter',
  imports: [],
  templateUrl: './product-counter.component.html',
  styleUrl: './product-counter.component.css',
})
export class ProductCounterComponent {
  counter: number = 0;
  counterService = inject(CounterService);

  ngOnInit() {
    this.counterService
      .getCounter()
      .subscribe((response) => (this.counter = response));
  }

  decreaseCounter() {
    this.counterService.updateCounter(this.counter - 1);
  }

  increaseCounter() {
    this.counterService.updateCounter(this.counter + 1);
  }
}
