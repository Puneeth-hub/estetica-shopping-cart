import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types';
import imageOne from '../assets/image1.png';
import imageTwo from '../assets/image2.png';
import imageThree from '../assets/image3.png';
import imageFour from '../assets/image4.png';
import imageFive from '../assets/image5.png'; 
import imageSix from '../assets/image6.png';
import imageSeven from '../assets/image7.png'; 
import imageEight from '../assets/image8.png';


interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  selectedCategory: string;
  currentPage: number;
  productsPerPage: number;
}

const initialState: ProductState = {
  products: [
    {
      id: '1',
      name: 'Trillion Protein Transfusion',
      brand: 'Trillion',
      price: 2500,
      image: imageOne,
      category: 'Hair Cut Wash & Style'
    },
    {
      id: '2',
      name: 'TIRTIR Mask Fit Red Cushion',
      brand: 'TIRTIR',
      price: 3000,
      image: imageTwo,
      category: 'Massage Therapy'
    },
    {
      id: '3',
      name: 'Kay Beauty Hydrating Foundation',
      brand: 'Kay Beauty',
      price: 1800,
      image: imageThree,
      category: 'Manicure & Pedicure'
    },
    {
      id: '4',
      name: 'Suroskie My Glow All-In-One',
      brand: 'Suroskie',
      price: 2200,
      image: imageFour,
      category: 'Nail Bar'
    },
    {
      id: '5',
      name: "L'Oreal Professionnel Paris",
      brand: "L'Oreal",
      price: 3500,
      image: imageFive,
      category: 'Hair Cut Wash & Style'
    },
    {
      id: '6',
      name: "L'Oreal Professionnel Hair Mask",
      brand: "L'Oreal",
      price: 2800,
      image: imageSix,
      category: 'Hair Cut Wash & Style'
    },
    {
      id: '7',
      name: "L'Oreal Professionnel Hydrating",
      brand: "L'Oreal",
      price: 4200,
      image: imageSeven,
      category: 'Massage Therapy'
    },
    {
      id: '8',
      name: "L'Oreal Professionnel Deep Clean",
      brand: "L'Oreal",
      price: 1950,
      image: imageEight,
      category: 'Nail Bar'
    }
  ],
  filteredProducts: [],
  searchQuery: '',
  selectedCategory: '',
  currentPage: 1,
  productsPerPage: 12
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      productSlice.caseReducers.filterProducts(state);
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
      productSlice.caseReducers.filterProducts(state);
    },
    filterProducts: (state) => {
      let filtered = state.products;
      
      if (state.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      
      if (state.selectedCategory) {
        filtered = filtered.filter(product => product.category === state.selectedCategory);
      }
      
      state.filteredProducts = filtered;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  }
});

export const { setSearchQuery, setSelectedCategory, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;