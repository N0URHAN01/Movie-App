import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CounterService } from '../services/counter.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  //  counterService = inject(CounterService)
  //  langService = inject(LanguageService)

  counter: number = 0;
  constructor(
    private counterService: CounterService,
    private langService: LanguageService
  ) {}

  ngOnInit() {
    this.counterService
      .getCounter()
      .subscribe((response) => (this.counter = response));

    this.langService.getLang().subscribe((lang) => console.log(lang));
  }
}
