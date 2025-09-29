import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Car } from '../../shared/models/car';
import { CarModelStats } from '../../shared/models/carModelStats';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  api = inject(HttpClient); // NOTE: inject() function, lets you pull dependencies outside of a constructor... instead of injecting dependencies via the constructor '(constructor(private http: HttpClient)'
  carsUrl = 'http://localhost:3000/cars';
  carModelStatsUrl = 'http://localhost:3000/carModelStats';

  getAllCars(): Observable<Car[]> {
    return this.api.get<Car[]>(this.carsUrl);
  }

  getCarDetails(id: string): Observable<Car> {
    return this.api.get<Car>(this.carsUrl + `/${id}`);
  }

  getModelsStats(): Observable<CarModelStats[]> {
    return this.api.get<CarModelStats[]>(this.carModelStatsUrl);
  }

  getTop5TrendingModels(): Observable<CarModelStats[]> {
    return this.getModelsStats().pipe(
      map((stats: CarModelStats[]) => {
        return [...stats]
          .sort((a, b) => {
            const byDeals = b.totalDeals - a.totalDeals; // b - a => sort in descending order => results: negative → a comes before b, positive → a comes after b, 0 → keep original order
            if (byDeals !== 0) return byDeals;
            return (
              new Date(b.lastDeal).getTime() - new Date(a.lastDeal).getTime()
            );
          })
          .slice(0, 5);
      })
    );
  }
}
