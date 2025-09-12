import { Component } from '@angular/core';
import { Car } from '../../../shared/models/car';
import { CarService } from '../../../core/services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  imports: [],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent {
  car: Car | null = null;
  carID: string = '';
  constructor(private carService: CarService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.carID = this.router.snapshot.params['id'];
    this.carService.getCarDetails(this.carID).subscribe({
      next: (car) => {
        this.car = car;
        console.log('Fetched Car Details: ', car);
      },
      error: (err) => {
        console.error('Error Fetching Car Details: ', err);
      },
    });
  }
}
