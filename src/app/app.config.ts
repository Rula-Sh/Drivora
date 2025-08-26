import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // NOTE: provider function introduced for standalone APIs. (instead of HttpClientModule)... It registers Angular’s HTTP client globally, so that any part of your app can use HttpClient for making API calls.
  ],
};
