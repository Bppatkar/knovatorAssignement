import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts, testConnection } from '../services/api';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [connectionTested, setConnectionTested] = useState(false);

  // Test server connection first
  useEffect(() => {
    const testServerConnection = async () => {
      try {
        console.log('Testing server connection...');
        await testConnection();
        console.log('Server connection successful');
        setConnectionTested(true);
      } catch (err) {
        console.error('Server connection failed:', err);
        setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
        setLoading(false);
      }
    };

    testServerConnection();
  }, []);

  // Fetch products after connection is tested
  useEffect(() => {
    if (!connectionTested) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products...');
        const response = await getProducts();
        console.log('Products received:', response.data.length);
        setProducts(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [connectionTested]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading products...</p>
            {!connectionTested && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Testing server connection...</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-6">🔌</div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Connection Error</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">{error}</p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Troubleshooting steps:</h3>
            <ul className="text-yellow-700 dark:text-yellow-300 text-sm text-left space-y-1">
              <li>• Make sure the backend server is running</li>
              <li>• Check if port 5000 is available</li>
              <li>• Run: <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">cd server && npm run dev</code></li>
              <li>• Verify MongoDB is running</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Grid */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Discover Products</h1>
          <span className="text-gray-600 dark:text-gray-300">
            {products.length} products found
          </span>
        </div>

        {error && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200">{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try refreshing the page or check your connection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;