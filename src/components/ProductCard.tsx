import React from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../types';
import { useAppDispatch } from '../hooks/redux';
import { addToCart } from '../store/cartSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative aspect-square p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-50 hover:text-purple-600"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
        <p className="font-semibold text-gray-900">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;