import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.thumbnail);
      });
  }, [productId]);

  if (!product) return <h2 className="text-center text-2xl">Loading...</h2>;

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-center py-8 text-gray-900">Product Details</h1>
      <div className="container relative mx-auto p-6 bg-gray-50">
        {/* Back Icon */}
        <div
          className="absolute text-2xl top-0 left-0 z-50 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <i className="fa-solid fa-angle-left"></i>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
        {/* Product Images Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-50 to-white">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[500px] object-cover rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105 duration-300"
          />
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-75 transition-opacity duration-200"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:ml-8 w-full md:w-1/2 text-left space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500">{product.category}</p>
          <div className="flex items-center space-x-2">
            <p className="text-xl font-semibold text-green-500">
              ${product.price}
            </p>
            <p className="text-sm text-gray-500 line-through">
              $
              {(product.price * (1 + product.discountPercentage / 100)).toFixed(
                2
              )}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <p className="text-lg font-semibold text-gray-700">
            {product.description}
          </p>

          {/* Product Details */}
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg shadow-sm">
            <p>
              <strong className="text-gray-800">Brand:</strong> {product.brand}
            </p>
            <p>
              <strong className="text-gray-800">SKU:</strong> {product.sku}
            </p>
            <p>
              <strong className="text-gray-800">Warranty:</strong>{" "}
              {product.warrantyInformation}
            </p>
            <p>
              <strong className="text-gray-800">Return Policy:</strong>{" "}
              {product.returnPolicy}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Customer Reviews
        </h3>
        {product.reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md my-4 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-800">
                {review.reviewerName}
              </span>
              <div className="flex items-center space-x-1 text-yellow-400">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-sm text-gray-500 mt-2">
              Reviewed on: {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

//  rating
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

export default ProductDetails;
