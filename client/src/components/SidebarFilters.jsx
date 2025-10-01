import React, { useState, useEffect } from 'react';
import { getFilters } from '../services/api';

const SidebarFilters = ({ filters, onFilterChange }) => {
  const [filterData, setFilterData] = useState({ categories: [], brands: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await getFilters();
        setFilterData(response.data);
      } catch (error) {
        console.error('Error fetching filters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const categories = [
    'Deals', 'Crypto', 'Fashion', 'Health & Wellness', 'Art', 
    'Home', 'Sport', 'Music', 'Gaming'
  ];

  const brands = [
    'Adidas', 'Columbia', 'Demix', 'New Balance', 'Nike', 'Xiaomi', 'Asics'
  ];

  const deliveryOptions = ['Standard', 'Pick Up'];

  const ratings = [
    { value: 4, label: '4 Stars & Up' },
    { value: 3, label: '3 Stars & Up' },
    { value: 2, label: '2 Stars & Up' },
  ];

  if (loading) {
    return (
      <div className="w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">All Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category === category}
                onChange={() => onFilterChange('category', filters.category === category ? '' : category)}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700 group-hover:text-purple-600 transition duration-200">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Price Range</h3>
        <p className="text-gray-600 text-sm mb-4">The average price is $300</p>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Min Price</label>
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Max Price</label>
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              placeholder="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Star Rating</h3>
        <div className="space-y-3">
          {ratings.map(rating => (
            <label key={rating.value} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating.value.toString()}
                onChange={() => onFilterChange('rating', filters.rating === rating.value.toString() ? '' : rating.value.toString())}
                className="w-4 h-4 text-purple-600"
              />
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < rating.value ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-700 group-hover:text-purple-600 transition duration-200">
                {rating.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Brand</h3>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brand === brand}
                onChange={() => onFilterChange('brand', filters.brand === brand ? '' : brand)}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700 group-hover:text-purple-600 transition duration-200">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Delivery Options */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Delivery Options</h3>
        <div className="space-y-2">
          {deliveryOptions.map(option => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.delivery === option}
                onChange={() => onFilterChange('delivery', filters.delivery === option ? '' : option)}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700 group-hover:text-purple-600 transition duration-200">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          onFilterChange('clear', '');
        }}
        className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition duration-200 font-medium"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default SidebarFilters;