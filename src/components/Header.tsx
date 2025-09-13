import React from 'react';
import { Search, Bell, User, ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleCart } from '../store/cartSlice';
import logo from '../assets/Button.png'

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white-600 rounded"><img src={logo} alt="logo"/></div>
            <h1 className="text-xl font-bold text-purple-600">Estetica</h1>
            <div>
            <h2 className="text-lg font-semibold text-gray-900">Welcome Back, Puneeth</h2>
            <p className="text-sm text-gray-600">Hello, here you can manage your orders by zone</p>
          </div>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleCart())}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">AD</span>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Profile</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* <div>
            <h2 className="text-lg font-semibold text-gray-900">Welcome Back, Rajesh</h2>
            <p className="text-sm text-gray-600">Hello, here you can manage your orders by zone</p>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;