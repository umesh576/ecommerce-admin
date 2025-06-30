export interface Order {
  _id: string;
  items: {
    product: {
      name: string;
    };
    quantity: number;
    price: number;
  }[];
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
}
