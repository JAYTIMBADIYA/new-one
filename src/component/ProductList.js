import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [avgPrice, setAvgPrice] = useState(0);

  // Fetching products from the API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products?sortBy=title&order=asc"
      );
      const data = await response.json();
      const limitedProducts = data.products.slice(0, 30); 
      setProducts(limitedProducts);
      setFilteredProducts(limitedProducts); 
      calculateAveragePrice(limitedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Calculate product prices
  const calculateAveragePrice = (products) => {
    const total = products.reduce((sum, product) => sum + product.price, 0);
    const average = total / products.length;
    setAvgPrice(average.toFixed(2));
  };

  // rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }
    if (halfStars) {
      stars.push(
        <span key={`half-star`} className="text-yellow-400">
          ★
        </span>
      );
    }
    return stars;
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    filterProducts(event.target.value, minPrice, maxPrice);
  };

  const handlePriceFilter = () => {
    filterProducts(searchQuery, minPrice, maxPrice);
  };

  const filterProducts = (search, min, max) => {
    const filtered = products.filter(
      (product) =>
        (product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())) &&
        product.price >= min &&
        product.price <= max
    );
    setFilteredProducts(filtered);
    calculateAveragePrice(filtered); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center py-8 text-gray-900">
        Product Store
      </h1>
      
      <div className="flex justify-between items-center mb-6 space-x-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full sm:w-1/2 lg:w-1/3 p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filter Section */}
        <div className="w-1/3">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="priceRange" className="text-sm text-gray-600">
              Price Range
            </label>
            <div className="text-sm text-gray-600">
              ${minPrice} - ${maxPrice}
            </div>
          </div>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="5000"
            step="10"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full mt-2"
          />
          <input
            type="range"
            id="priceRange"
            min="0"
            max="5000"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full mt-2"
          />
          <div className="mt-6 text-center">
        <p className="text-xl font-semibold text-gray-800">
          Average Product Price: ${avgPrice}
        </p>
      </div>

      
        </div>
        
      </div>
      <div className="text-end">
      <button
        onClick={handlePriceFilter}
        className="w-full sm:w-1/4 p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors mt-4"
      >
        Apply Price Filter
      </button>
      </div>

      

      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Product List
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <Link to={`/product/${product.id}`} className="block text-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <p className="text-lg font-semibold text-green-500">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500 line-through">
                $
                {(
                  product.price *
                  (1 + product.discountPercentage / 100)
                ).toFixed(2)}
              </p>
              <div className="flex items-center justify-center space-x-1 mt-2">
                {renderStars(product.rating)}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
