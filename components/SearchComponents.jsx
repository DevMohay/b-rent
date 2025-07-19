import React from "react";

function SearchComponents() {
  return (
    <div className="flex items-center justify-center p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <select
          name="All Categories"
          id=""
          className="border  rounded p-2  w-48 bg-gray-100"
        >
          <option value="">All Categories</option>
          <option value="">House</option>
          <option value="">Mess</option>
          <option value="">Shop</option>
          <option value="">Resturant</option>
          <option value="">Land</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded p-2 bg-gray-100 ml-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2 cursor-pointer">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchComponents;
