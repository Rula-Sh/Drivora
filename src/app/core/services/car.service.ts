import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../shared/models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  api = inject(HttpClient); // NOTE: inject() function, lets you pull dependencies outside of a constructor... instead of injecting dependencies via the constructor '(constructor(private http: HttpClient)'
  url = 'http://localhost:3000/cars';

  getAllCars(): Observable<Car[]> {
    return this.api.get<Car[]>(this.url);
  }
}
