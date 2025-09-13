export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AppointmentProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  hasDiscount?: boolean;
}

export interface BillingSummary {
  serviceTotal: number;
  productTotal: number;
  discountPercent: number;
  taxPercent: number;
  finalTotal: number;
}

export interface AppState {
  products: Product[];
  cart: CartItem[];
  searchQuery: string;
  selectedCategory: string;
  isCartOpen: boolean;
  appointmentProducts: AppointmentProduct[];
  billingSummary: BillingSummary;
}