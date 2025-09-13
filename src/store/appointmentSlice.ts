import { createSlice} from '@reduxjs/toolkit';
import type {PayloadAction } from '@reduxjs/toolkit';
import type { AppointmentProduct, BillingSummary } from '../types';

interface AppointmentState {
  products: AppointmentProduct[];
  billingSummary: BillingSummary;
  bookingId: string;
}

const initialState: AppointmentState = {
  products: [
    {
      id: '1',
      name: 'Serum',
      quantity: 1,
      unitPrice: 300,
      total: 300,
      hasDiscount: false
    },
    {
      id: '2',
      name: 'Face Mask',
      quantity: 1,
      unitPrice: 200,
      total: 200,
      hasDiscount: false
    }
  ],
  billingSummary: {
    serviceTotal: 1800,
    productTotal: 500,
    discountPercent: 0,
    taxPercent: 18,
    finalTotal: 2714
  },
  bookingId: 'APT-001'
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    updateProductQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const product = state.products.find(p => p.id === action.payload.productId);
      if (product) {
        product.quantity = Math.max(0, action.payload.quantity);
        product.total = product.quantity * product.unitPrice;
        appointmentSlice.caseReducers.recalculateBilling(state);
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      appointmentSlice.caseReducers.recalculateBilling(state);
    },
    toggleDiscount: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.hasDiscount = !product.hasDiscount;
      }
    },
    addProduct: (state, action: PayloadAction<Omit<AppointmentProduct, 'total'>>) => {
      const newProduct: AppointmentProduct = {
        ...action.payload,
        total: action.payload.quantity * action.payload.unitPrice
      };
      state.products.push(newProduct);
      appointmentSlice.caseReducers.recalculateBilling(state);
    },
    recalculateBilling: (state) => {
      const productTotal = state.products.reduce((sum, product) => sum + product.total, 0);
      const subtotal = state.billingSummary.serviceTotal + productTotal;
      const discountAmount = (subtotal * state.billingSummary.discountPercent) / 100;
      const afterDiscount = subtotal - discountAmount;
      const taxAmount = (afterDiscount * state.billingSummary.taxPercent) / 100;
      
      state.billingSummary.productTotal = productTotal;
      state.billingSummary.finalTotal = afterDiscount + taxAmount;
    },
    setDiscountPercent: (state, action: PayloadAction<number>) => {
      state.billingSummary.discountPercent = action.payload;
      appointmentSlice.caseReducers.recalculateBilling(state);
    }
  }
});

export const {
  updateProductQuantity,
  removeProduct,
  toggleDiscount,
  addProduct,
  setDiscountPercent
} = appointmentSlice.actions;
export default appointmentSlice.reducer;