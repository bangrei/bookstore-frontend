interface Book {
  id: string;
  title: string;
  writer: string;
  image: string;
  point: number;
  tags: string[];
}
interface Cart {
  items: CartItem[];
  customerId?: number | null;
  usedPoints?: number | null;
  totalQty: number;
  points: number;
}
interface CartItem {
  book: Book;
  qty: number;
}
interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  points: number;
}
interface Order {
  id: number;
  canceled: number;
  qty: number;
  total: number;
  items: OrderItem[];
  user: Customer;
}
interface OrderItem {
  book: Book;
  id: number;
  point: number;
  qty: number;
}

