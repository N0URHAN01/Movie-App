import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  //scroll behavior smooth => bootstrap
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration:'top'})),
    provideHttpClient()
  ]
};
