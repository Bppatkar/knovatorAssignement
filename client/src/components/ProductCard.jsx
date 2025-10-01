import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < Math.floor(rating)
            ? 'text-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      >
        ★
      </span>
    ));
  };

  // Fallback image in case the main image fails to load
  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/500/374151/FFFFFF?text=${encodeURIComponent(
      product.name
    )}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {product.brand}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {product.deliveryOptions.includes('Pick Up')
              ? 'Pickup Available'
              : 'Delivery'}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({product.rating})
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-blue-600 transition duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="font-semibold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
