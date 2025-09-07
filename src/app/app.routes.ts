import { Routes } from '@angular/router';
import { HomeComponent } from './features/customer/pages/home/home.component';
import { CarsComponent } from './features/customer/pages/cars/cars.component';
import { CarDetailsComponent } from './features/common/car-details/car-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'cars',
    component: CarsComponent,
  },
  {
    path: 'car-details/:id',
    component: CarDetailsComponent,
  },
];
