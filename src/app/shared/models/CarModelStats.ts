export interface CarModelStats {
  id: string;
  make: string;
  model: string;
  year: number;
  image: string;

  totalDeals: number;
  lastDeal: Date;
}
