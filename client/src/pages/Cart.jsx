import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';
import toast from 'react-hot-toast';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
    useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.address) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalAmount: getTotalPrice(),
      };

      await placeOrder(orderData);
      toast.success('Order placed successfully! 🎉');
      setOrderSuccess(true);
      clearCart();
      setFormData({ firstName: '', lastName: '', address: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-12 rounded-3xl shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-xl opacity-90 mb-6">
              Thank you for your purchase. Your order has been received.
            </p>
            <a
              href="/"
              className="bg-white text-gray-800 px-8 py-3 rounded-xl hover:bg-gray-100 transition duration-200 font-semibold text-lg"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 text-xl mb-8">
            Add some products to get started!
          </p>
          <a
            href="/"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-blue-600 transition duration-200 font-semibold text-lg"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center border-b border-gray-100 py-6 last:border-b-0"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />

                <div className="flex-1 ml-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.product.brand}
                  </p>
                  <p className="text-xl font-bold text-purple-600">
                    ${item.product.price}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity - 1)
                      }
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-sm transition duration-200"
                    >
                      -
                    </button>

                    <span className="w-12 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity + 1)
                      }
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-sm transition duration-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary and Form */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-2xl p-6 sticky top-24 text-white">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span>Total Items:</span>
                <span className="font-semibold">
                  {items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold border-t border-white/20 pt-3">
                <span>Total Price:</span>
                <span className="text-2xl">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition duration-200 placeholder-white/60"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition duration-200 placeholder-white/60"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-1"
                >
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition duration-200 placeholder-white/60 resize-none"
                  placeholder="Enter your delivery address"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-purple-600 py-4 px-4 rounded-xl hover:bg-gray-100 transition duration-200 font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                    <span>Placing Order...</span>
                  </div>
                ) : (
                  'Place Order'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
