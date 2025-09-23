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
  carHighlights: {
    key: string;
    value: string | number;
    name: string;
    icon: string;
  }[] = [];
  carProperties: {
    key: string;
    value: string | number;
    name: string;
    icon: string;
  }[] = [];

  constructor(private carService: CarService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.carID = this.router.snapshot.params['id'];
    this.carService.getCarDetails(this.carID).subscribe({
      next: (car) => {
        this.car = car;
        console.log('Fetched Car Details: ', car);
        this.viewCarHighlights();
        this.viewCarDetails();
      },
      error: (err) => {
        console.error('Error Fetching Car Details: ', err);
      },
    });
  }

  viewCarHighlights() {
    this.carHighlights =
      this.car?.highlights?.map((key, value) => ({
        key,
        value,
        name: this.splitCamelCase(key),
        icon: `https://res.cloudinary.com/dnoxelx9f/image/upload/v1756714742/${key}.png`, // TODO: Update Cloudinary path
      })) || [];
  }

  viewCarDetails() {
    const excludedKeys: (keyof Car)[] = [
      // exclude these keys from being displayed as properties
      'id',
      'licensePlate',
      'make',
      'model',
      'year',
      'color',
      'location',
      'images',
      'highlights',
      'description',
      'features',
      'isAvailable',
      'saleType',
      'price',
      'currency',
      'rentalPeriod',
      'condition',
      'registrationExpiry',
      'insuranceExpiry',
      'ownerId',
      'customerId',
    ];
    const highlightKeys = this.carHighlights.map((h) => h.key);

    this.carProperties = Object.entries(this.car!)
      .filter(
        ([key, value]) =>
          value !== undefined &&
          !excludedKeys.includes(key as keyof Car) &&
          !highlightKeys.includes(key)
      )
      .map(([key, value]) => ({
        key,
        value,
        name: this.splitCamelCase(key),
        icon: `https://res.cloudinary.com/dnoxelx9f/image/upload/v1756714742/${key}.png`, // TODO: Update Cloudinary path
      }));
  }
  splitCamelCase(str: string): string {
    return str
      .replace(/([A-Z])/g, ' $1') // insert space before uppercase letters
      .replace(/^./, (s) => s.toUpperCase()); // capitalize first letter
  }
}
