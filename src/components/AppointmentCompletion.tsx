import React from 'react';
import { Edit, Trash2, Plus, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { updateProductQuantity, removeProduct, toggleDiscount } from '../store/appointmentSlice';

const schema = yup.object({
  quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
});

const AppointmentCompletion: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, billingSummary, bookingId } = useAppSelector(state => state.appointment);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleQuantityUpdate = (productId: string, quantity: number) => {
    dispatch(updateProductQuantity({ productId, quantity }));
  };

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeProduct(productId));
  };

  const handleToggleDiscount = (productId: string) => {
    dispatch(toggleDiscount(productId));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Appointment Completion</h1>
        <p className="text-gray-600">Booking Summary - {bookingId}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products Used Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded"></div>
              </div>
              <h2 className="text-lg font-semibold">Products Used</h2>
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleRemoveProduct(product.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <label className="block text-gray-600 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleQuantityUpdate(product.id, parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Unit Price</label>
                      <p className="px-3 py-2 bg-gray-50 rounded-md">₹{product.unitPrice}</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Total</label>
                      <p className="px-3 py-2 bg-gray-50 rounded-md font-medium">₹{product.total}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => handleToggleDiscount(product.id)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                        product.hasDiscount
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Special Discount</span>
                    </button>
                  </div>
                </div>
              ))}

              <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Extra Products</span>
              </button>
            </div>
          </div>
        </div>

        {/* Billing Summary */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-6">Billing Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Service Total</span>
                <span>₹{billingSummary.serviceTotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Product Total</span>
                <span>₹{billingSummary.productTotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Order Discount (%)</span>
                <span>{billingSummary.discountPercent}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax ({billingSummary.taxPercent}%)</span>
                <span>₹{((billingSummary.serviceTotal + billingSummary.productTotal) * billingSummary.taxPercent / 100).toFixed(2)}</span>
              </div>
              
              <hr className="my-4" />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Final Total</span>
                <span>₹{billingSummary.finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors mt-6 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Complete Payment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCompletion;