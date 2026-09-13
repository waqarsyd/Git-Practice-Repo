export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  category: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  maxPrice: number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export interface NotificationItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
