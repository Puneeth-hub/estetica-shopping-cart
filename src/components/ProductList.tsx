import React from 'react';
import { useAppSelector } from '../hooks/redux';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const { products, filteredProducts, searchQuery, selectedCategory } = useAppSelector(
    state => state.products
  );

  const productsToShow = searchQuery || selectedCategory ? filteredProducts : products;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Products</h2>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <span>All Status</span>
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {productsToShow.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {productsToShow.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;