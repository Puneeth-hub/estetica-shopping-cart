import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadFromStorage: (state, action: PayloadAction<CartState>) => {
      if (action.payload && action.payload.items) {
        state.items = action.payload.items;
        state.total = action.payload.total || 0;
        cartSlice.caseReducers.calculateTotal(state);
      }
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1
        });
      }
      
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find(item => item.product.id === action.payload.productId);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(item => item.product.id !== action.payload.productId);
        }
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    calculateTotal: (state) => {
      state.total = state.items.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  toggleCart, 
  setCartOpen, 
  clearCart,
  loadFromStorage
} = cartSlice.actions;
export default cartSlice.reducer;