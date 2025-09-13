import { configureStore, createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from "@reduxjs/toolkit" 
import productReducer from "./store/productSlice" 
import cartReducer  from "./store/cartSlice"
import appointmentReducer from "./store/appointmentSlice"


interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string; 
}

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  products: Product[];
  cart: CartItem[];
  searchQuery: string;
  filterCategory: string;
}

const initialState: AppState = {
  products: [], // Populate this on init
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  searchQuery: '',
  filterCategory: 'All',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setFilterCategory(state, action: PayloadAction<string>) {
      state.filterCategory = action.payload;
    },
    addToCart(state, action: PayloadAction<Product>) {
      const item = state.cart.find(p => p.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateCartQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.cart.find(p => p.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(p => p.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { setProducts, setSearchQuery, setFilterCategory, addToCart, updateCartQuantity, removeFromCart } = appSlice.actions;

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    appointment: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
