import { Component } from '@angular/core';
import { Car } from '../../../shared/models/car';
import { CarService } from '../../../core/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetailItem } from '../../../shared/models/carDetailItem';

@Component({
  selector: 'app-car-details',
  imports: [],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent {
  carID: string = '';
  car: Car | null = null;
  carHighlights: CarDetailItem<null>[] = [];
  carFeatures: CarDetailItem<null>[] = [];
  carProperties: CarDetailItem<string | number>[] = [];

  constructor(private carService: CarService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.carID = this.router.snapshot.params['id'];
    this.carService.getCarDetails(this.carID).subscribe({
      next: (car) => {
        this.car = car;
        console.log('Fetched Car Details: ', car);
        this.viewCarHighlights();
        this.viewCarDetails();
        this.viewCarFeatures();
      },
      error: (err) => {
        console.error('Error Fetching Car Details: ', err);
      },
    });
  }

  viewCarHighlights(): void {
    this.carHighlights =
      this.car?.highlights?.map((key) => ({
        key,
        value: null,
        name: key,
        icon: `/assets/images/car-features-icons/${this.mergeCamelCase(
          key
        )}.png`,
      })) || [];
  }
  mergeCamelCase(str: string): string {
    if (str.includes('(')) {
      return str.substring(str.indexOf('(') + 1, str.indexOf(')'));
    }
    return str.replace(/^./, (s) => s.toLowerCase()).replace(/\s/g, '');
  }

  viewCarDetails(): void {
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

    if (!this.car) return;

    this.carProperties = Object.entries(this.car)
      .filter(
        ([key, value]) =>
          value !== undefined && !excludedKeys.includes(key as keyof Car)
      )
      .map(([key, value]) => ({
        key,
        value,
        name: this.splitCamelCase(key),
        icon: `/assets/images/car-details/${key}.png`,
      }));
  }
  splitCamelCase(str: string): string {
    return str
      .replace(/([A-Z])/g, ' $1') // insert space before uppercase letters
      .replace(/^./, (s) => s.toUpperCase()); // capitalize first letter
  }

  viewCarFeatures(): void {
    this.carFeatures =
      this.car?.features?.map((key) => ({
        key,
        value: null,
        name: key,
        icon: `/assets/images/car-features-icons/${this.mergeCamelCase(
          key
        )}.png`,
      })) || [];
  }
}
