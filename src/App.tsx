import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import AppointmentCompletion from './components/AppointmentCompletion';
import './index.css'

function App() {
  const [currentView, setCurrentView] = useState<'products' | 'appointment'>('products');

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <Header />
         <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setCurrentView('products')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'products'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setCurrentView('appointment')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'appointment'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Appointment Completion
            </button>
          </div>

          {currentView === 'products' ? (
            <>
              <SearchBar />
              <CategoryFilter />
              <ProductList />
            </>
          ) : (
            <AppointmentCompletion />
          )}
        </div>

        <CartSidebar />
      </div>
    </Provider>
  );
}

export default App;