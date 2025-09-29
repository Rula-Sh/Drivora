export interface CarDetailItem <TValue> { // <TValue> is a generic type parameter
  key: string;
  value: TValue; // specified when using the interface, can be string, number, boolean, etc.
  name: string;
  icon: string;
}
