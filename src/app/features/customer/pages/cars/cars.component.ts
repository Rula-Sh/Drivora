import { Component } from '@angular/core';
import { Car } from '../../../../shared/models/car';
import { CarService } from '../../../../core/services/car.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cars',
  imports: [RouterLink],
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
        console.error('Error fetching cars: ', err);
      },
    });
  }
}
