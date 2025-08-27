import { Component } from '@angular/core';
import { Car } from '../../../../shared/models/car';
import { CarService } from '../../../../core/services/car.service';

@Component({
  selector: 'app-cars',
  imports: [],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss',
})
export class CarsComponent {
  cars: Car[] = [];
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getAllCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        console.log('Fetched Cars: ', cars);
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      },
    });
  }
}
