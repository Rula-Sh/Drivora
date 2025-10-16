import { Component } from '@angular/core';
import { Car } from '../../../shared/models/car';
import { CarService } from '../../../core/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetailItem } from '../../../shared/models/carDetailItem';
import { CarCompany } from '../../../shared/models/carCompany';

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
  carProperties: CarDetailItem<string | number>[] = [];
  carFeatures: CarDetailItem<null>[] = [];
  carCompany: CarCompany | null = null;

  constructor(private carService: CarService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.carID = this.router.snapshot.params['id'];
    this.carService.getCarDetails(this.carID).subscribe({
      next: (car) => {
        this.car = car;
        console.log('Fetched Car Details: ', car);
        this.getCarCompanyDetails(this.car.make);
        this.viewCarSpecificationsByType('highlights');
        this.viewCarProperties();
        this.viewCarSpecificationsByType('features');
      },
      error: (err) => {
        console.error('Error Fetching Car Details: ', err);
      },
    });
  }
  
  getCarCompanyDetails(carMake: string): void {
    this.carService.getCarCompany(carMake).subscribe({
      next: (company) => {
        this.carCompany = company[0]; // [0] because the API returns an array
        console.log('Fetched Car Company: ', this.carCompany);
        
      },
      error: (err) => {
        console.error('Error Fetching Car Company: ', err);
      },
    });
  }

  viewCarSpecificationsByType(type: 'highlights' | 'features'): void {
    const keys = this.car?.[type];
    const mapped = this.mapCarSpecifications(keys);

    if (type === 'highlights') {
      this.carHighlights = mapped;
    } else {
      this.carFeatures = mapped;
    }
  }
  mapCarSpecifications(keys: string[] | undefined): CarDetailItem<null>[] {
    return (
      keys?.map((key) => ({
        key,
        value: null,
        name: key,
        icon: `/assets/images/car-features-icons/${this.mergeCamelCase(
          key
        )}.png`,
      })) || []
    );
  }

  mergeCamelCase(str: string): string {
    if (str.includes('(')) {
      return str.substring(str.indexOf('(') + 1, str.indexOf(')'));
    }
    return str.replace(/^./, (s) => s.toLowerCase()).replace(/\s/g, '');
  }

  viewCarProperties(): void {
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
}
