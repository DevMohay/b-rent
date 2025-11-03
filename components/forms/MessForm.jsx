"use client";
import React, { useState, useEffect } from "react";
import MapPicker from "../ui/MapPicker";

export default function MessForm({ onChange }) {
  const [form, setForm] = useState({
    category: "mess",
    union: "",
    area: "",
    roadNumber: "",
    coordinates: { lat: "", lng: "" },
    title: "",
    description: "",
    floorNumbers: "",
    floorType: " tiles",
    roofType: " saad",
    baranda: false,
    balcony: false,
    rentOrSale: "rent",
    price: "",
    singleRoomPrice: "",
    doubleRoomPrice: "",
    size: "",
    seatCount: "",
    commonRoom: false,
    kitchen: false,
    furnished: false,
    amenities: [],
    images: [],
  });

  // Map selection handled by MapPicker component

  // 🔁 Parent কে notify করো form data change হলে
  useEffect(() => {
    if (onChange) onChange(form);
  }, [form, onChange]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenities = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((item) => item !== value),
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 border-b pb-2">🛏️ Mess Post Form</h2>
      
      {/* Basic Information Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter a descriptive title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your mess accommodation in detail"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Location Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Union</label>
            <input
              name="union"
              value={form.union}
              onChange={handleChange}
              placeholder="Enter union"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="Enter area"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Road Number</label>
            <input
              name="roadNumber"
              value={form.roadNumber}
              onChange={handleChange}
              placeholder="Enter road number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-3">
          <MapPicker
            value={form.coordinates}
            onChange={(coords) =>
              setForm((prev) => ({ ...prev, coordinates: coords }))
            }
            buttonLabel="Pick Location on Map"
          />
        </div>
      </div>

      {/* Mess Details Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Mess Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Single Room Price (৳)</label>
            <input
              type="number"
              name="singleRoomPrice"
              value={form.singleRoomPrice}
              onChange={handleChange}
              placeholder="Enter price for single room"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Double Room Price (৳)</label>
            <input
              type="number"
              name="doubleRoomPrice"
              value={form.doubleRoomPrice}
              onChange={handleChange}
              placeholder="Enter price for double room"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">3 Bedded Room Price (৳)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price for 3 bedded room"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size (sqft)</label>
            <input
              name="size"
              value={form.size}
              onChange={handleChange}
              placeholder="Enter size in square feet"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
            <input
              name="seatCount"
              value={form.seatCount}
              onChange={handleChange}
              placeholder="Enter total number of seats"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Floors</label>
            <input
              name="floorNumbers"
              type="number"
              value={form.floorNumbers}
              onChange={handleChange}
              placeholder="Enter number of floors"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Floor Type</label>
            <select
              name="floorType"
              onChange={handleChange}
              value={form.floorType}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tiles">টাইলস</option>
              <option value="marble">ঢালায়</option>
              <option value="wood">মাটি</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roof Type</label>
            <select
              name="roofType"
              value={form.roofType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="saad">ছাদ</option>
              <option value="TinShed">টিন শেড</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="balcony"
              name="balcony"
              checked={form.balcony}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="balcony" className="ml-2 text-sm text-gray-700">Balcony</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="baranda"
              name="baranda"
              checked={form.baranda}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="baranda" className="ml-2 text-sm text-gray-700">Baranda</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="commonRoom"
              name="commonRoom"
              checked={form.commonRoom}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="commonRoom" className="ml-2 text-sm text-gray-700">Common Room</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="kitchen"
              name="kitchen"
              checked={form.kitchen}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="kitchen" className="ml-2 text-sm text-gray-700">Kitchen</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="furnished"
              name="furnished"
              checked={form.furnished}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="furnished" className="ml-2 text-sm text-gray-700">Furnished</label>
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Gas",
            "Electricity",
            "Water",
            "Internet",
            "Security Guard",
            "Parking",
          ].map((item) => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                id={`amenity-${item}`}
                value={item}
                checked={form.amenities.includes(item)}
                onChange={handleAmenities}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`amenity-${item}`} className="ml-2 text-sm text-gray-700">{item}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Images Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Property Images</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <label className="block cursor-pointer">
            <span className="text-gray-700">Upload images (multiple allowed)</span>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setForm((prev) => ({ ...prev, images: Array.from(e.target.files) }))
              }
              className="mt-2 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </label>
          <p className="mt-1 text-xs text-gray-500">
            Upload clear, high-quality images of your property
          </p>
        </div>
        {form.images.length > 0 && (
          <p className="mt-2 text-sm text-green-600">
            {form.images.length} {form.images.length === 1 ? 'image' : 'images'} selected
          </p>
        )}
      </div>
    </div>
  );
}
