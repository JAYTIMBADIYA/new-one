import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa'; 

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false); 

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          slug: item.slug,
          name: item.name,
          url: item.url,
        }));
        setCategories(formattedData);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Product Categories</h1>
        
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="text-white hover:text-yellow-400 focus:outline-none"
        >
          <FaChevronDown className={`transform transition-transform ${showCategories ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      </div>

      <ul
        className={`mt-4 space-y-2 transition-all duration-300 overflow-hidden ${
          showCategories ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {categories.map((category, index) => (
          <li key={index} className="hover:text-yellow-400">
            <a href={category.url}>{category.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
