export interface Package {
  _id: string;
  title: string;
  description: string;
  price: number;
  availableDates: string;
  image: string;

}
export interface packageCardProps extends Package {
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
}
export interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  people: number;
  specialRequest: string;
  bookingDate: string;
}
