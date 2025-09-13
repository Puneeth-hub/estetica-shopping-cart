import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSelectedCategory } from '../store/productSlice';

const categories = [
  'Massage Therapy',
  'Hair Cut Wash & Style',
  'Nail Bar',
  'Manicure & Pedicure'
];

const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.products.selectedCategory);

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(selectedCategory === category ? '' : category));
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategorySelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;