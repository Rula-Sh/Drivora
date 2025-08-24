export interface Car {
  // Car Details
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  color:
    | 'White'
    | 'Black'
    | 'Gray'
    | 'Silver'
    | 'Blue'
    | 'Red'
    | 'Green'
    | 'Yellow'
    | 'Brown'
    | 'Beige'
    | string;
  bodyType?: string; // Sedan, SUV, Hatchback, etc.
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  mileage?: number;
  doors: number;
  seats: number;
  horsepower?: number;
  images: string[];
  description?: string;

  // Sale | Rent Info
  price: number;
  currency?: string;
  saleType: 'sale' | 'rent';
  rentalPeriod?: string;
  isAvailable: boolean;

  // Owner and Customer Info
  ownerId: string;
  customerId?: string;
}
