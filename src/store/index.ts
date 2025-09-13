import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import appointmentReducer from './appointmentSlice';
import { loadFromStorage } from './cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    appointment: appointmentReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Persist cart to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
});

// Load cart from localStorage
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  try {
    const parsedCart = JSON.parse(savedCart);
    store.dispatch(loadFromStorage(parsedCart));
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;