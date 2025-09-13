import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSearchQuery } from '../store/productSlice';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(state => state.products.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for Product !"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <Filter className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700">All Status</span>
      </button>
    </div>
  );
};

export default SearchBar;