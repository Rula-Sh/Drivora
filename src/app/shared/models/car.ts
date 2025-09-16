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
  bodyType: string; // Sedan, SUV, Hatchback, etc.
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric' | 'Hydrogen';
  transmission: 'Manual' | 'Automatic';
  drivetrain?: 'FWD' | 'RWD' | 'AWD' | '4WD';
  doors: number;
  seats: number;
  location: string;
  images: string[];
  highlights: string[]; // selected by owner, Car keys to be highlighted on UI

  // Optional Specs
  fuelConsumption?: number; // L/100km or mpg (clarify unit globally)
  engineDisplacement?: number; // in liters, e.g., 2.0
  fuelCapacity?: number;
  cylinders?: number;
  mileage?: number;
  horsepower?: number;
  description?: string;
  features?: string[]; //['Air Conditioning', 'GPS', 'Bluetooth', 'Child Seat']

  // Sale | Rent Info
  isAvailable: boolean;
  saleType: 'sale' | 'rent';
  price: number;
  currency?: string;
  rentalPeriod?: string;
  condition?: 'New' | 'Used' | 'CPO'; // for sale cars, CPO = Certified Pre-Owned (used car but inspected and certified by manufacture)
  registrationExpiry?: string; // for sale cars
  insuranceExpiry?: string; // for rental cars

  // Owner and Customer Info
  ownerId: string;
  customerId?: string;
}
