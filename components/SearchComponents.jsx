import React, { useState } from "react";
import { FiSearch, FiFilter, FiHome, FiShoppingBag, FiMapPin } from "react-icons/fi";
import { MdRestaurant, MdApartment } from "react-icons/md";

function SearchComponents() {
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const getCategoryIcon = (value) => {
    switch (value) {
      case "house":
        return <FiHome className="text-blue-600" />;
      case "mess":
        return <MdApartment className="text-purple-600" />;
      case "shop":
        return <FiShoppingBag className="text-green-600" />;
      case "resturant":
        return <MdRestaurant className="text-orange-600" />;
      case "land":
        return <FiMapPin className="text-teal-600" />;
      default:
        return <FiFilter className="text-gray-600" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Main Search Container */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Category Dropdown */}
          <div className="relative flex-shrink-0 md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none z-10">
              {getCategoryIcon(category)}
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-full px-4 pl-14 py-5 text-base font-semibold text-gray-700 bg-gradient-to-r from-gray-50 to-white focus:outline-none focus:ring-0 appearance-none cursor-pointer hover:bg-gray-50 transition-all duration-300"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.5rem'
              }}
            >
              <option value="">All Categories</option>
              <option value="house">🏠 House</option>
              <option value="mess">🏢 Mess</option>
              <option value="shop">🏪 Shop</option>
              <option value="resturant">🍽️ Restaurant</option>
              <option value="land">🗺️ Land</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative flex-grow">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search properties, locations, or keywords..."
              className="w-full h-full px-5 pl-14 py-5 text-base text-gray-700 bg-white focus:outline-none focus:ring-0 placeholder:text-gray-400"
            />
          </div>

          {/* Search Button */}
          <button className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 md:px-12 py-5 font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl group">
            <FiSearch className="text-2xl group-hover:scale-110 transition-transform duration-300" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Quick Filter Tags (Optional) */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button className="px-5 py-2.5 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-semibold border border-gray-200 hover:border-blue-300 flex items-center gap-2 group">
          <span className="text-lg group-hover:scale-110 transition-transform">🏠</span>
          <span>Houses</span>
        </button>
        <button className="px-5 py-2.5 bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-semibold border border-gray-200 hover:border-purple-300 flex items-center gap-2 group">
          <span className="text-lg group-hover:scale-110 transition-transform">🏢</span>
          <span>Apartments</span>
        </button>
        <button className="px-5 py-2.5 bg-white hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-semibold border border-gray-200 hover:border-green-300 flex items-center gap-2 group">
          <span className="text-lg group-hover:scale-110 transition-transform">💰</span>
          <span>For Rent</span>
        </button>
        <button className="px-5 py-2.5 bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-semibold border border-gray-200 hover:border-orange-300 flex items-center gap-2 group">
          <span className="text-lg group-hover:scale-110 transition-transform">🏷️</span>
          <span>For Sale</span>
        </button>
      </div>
    </div>
  );
}

export default SearchComponents;