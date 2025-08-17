import { Routes } from '@angular/router';
import { HomeComponent } from './features/customer/pages/home/home.component';
import { CarsComponent } from './features/customer/pages/cars/cars.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'cars',
    component: CarsComponent,
  },
];
