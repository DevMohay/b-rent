"use client";
import React, { useState, useEffect } from "react";
import MapPicker from "../ui/MapPicker";

const HouseForm = ({ onChange }) => {
  const [form, setForm] = useState({
    union: "",
    area: "",
    roadNumber: "",
    coordinates: { lat: "", lng: "" },
    title: "",
    description: "",
    rentOrSale: "rent",
    price: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    floorNumber: "",
    totalFloors: "",
    balconyCount: "",
    drawingRoom: false,
    diningRoom: false,
    kitchenCount: "",
    furnished: false,
    amenities: [],
    images: [],
  });

  // Map selection handled by shared MapPicker component

  useEffect(() => {
    if (onChange) {
      onChange(form); // Send form data to parent whenever it changes
    }
  }, [form, onChange]);

  // Removed inline Google Maps logic

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
        : prev.amenities.filter((a) => a !== value),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Basic Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Title</label>
            <input 
              name="title" 
              placeholder="Enter a descriptive title" 
              value={form.title} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
              required
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select 
              name="rentOrSale" 
              value={form.rentOrSale} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (BDT)</label>
            <input 
              name="price" 
              type="number" 
              placeholder="Enter price" 
              value={form.price} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
              required
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Size (sq ft)</label>
            <input 
              name="size" 
              type="number" 
              placeholder="Enter size in square feet" 
              value={form.size} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
              required
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            name="description" 
            placeholder="Describe your property in detail" 
            value={form.description} 
            onChange={handleChange} 
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
            required
          />
        </div>
      </div>
      
      {/* Location Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Location Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Union</label>
            <input 
              name="union" 
              placeholder="Enter union" 
              value={form.union} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
              required
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
            <input 
              name="area" 
              placeholder="Enter area" 
              value={form.area} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
              required
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Road Number</label>
            <input 
              name="roadNumber" 
              placeholder="Enter road number" 
              value={form.roadNumber} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
            />
          </div>
        </div>
        
        <MapPicker
          apiKey="AlzaSyc63WZ7pf2DBDRDLqUIwvSNTf2m2iswMug"
          value={form.coordinates}
          onChange={(coords) => setForm((prev) => ({ ...prev, coordinates: coords }))}
        />
      </div>
      
      {/* Property Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
            <input 
              name="bedrooms" 
              type="number" 
              placeholder="Number of bedrooms" 
              value={form.bedrooms} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
            <input 
              name="bathrooms" 
              type="number" 
              placeholder="Number of bathrooms" 
              value={form.bathrooms} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Floor Number</label>
            <input 
              name="floorNumber" 
              type="number" 
              placeholder="Current floor number" 
              value={form.floorNumber} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Floors</label>
            <input 
              name="totalFloors" 
              type="number" 
              placeholder="Total floors in building" 
              value={form.totalFloors} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Balconies</label>
            <input 
              name="balconyCount" 
              type="number" 
              placeholder="Number of balconies" 
              value={form.balconyCount} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kitchens</label>
            <input 
              name="kitchenCount" 
              type="number" 
              placeholder="Number of kitchens" 
              value={form.kitchenCount} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" 
            />
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="drawingRoom" 
              name="drawingRoom" 
              checked={form.drawingRoom} 
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
            />
            <label htmlFor="drawingRoom" className="ml-2 block text-sm text-gray-700">Drawing Room</label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="diningRoom" 
              name="diningRoom" 
              checked={form.diningRoom} 
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
            />
            <label htmlFor="diningRoom" className="ml-2 block text-sm text-gray-700">Dining Room</label>
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
            <label htmlFor="furnished" className="ml-2 block text-sm text-gray-700">Furnished</label>
          </div>
        </div>
      </div>
      
      {/* Amenities Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Gas", "Electricity", "Water", "Internet", "Lift", "Generator", "Parking", "Security Guard"].map((item) => (
            <label key={item} className="inline-flex items-center">
              <input
                type="checkbox"
                value={item}
                checked={form.amenities.includes(item)}
                onChange={handleAmenities}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{item}</span>
            </label>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Property Images</h3>
          <label className="block w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-gray-500">Upload images (multiple allowed)</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) =>
                setForm({ ...form, images: Array.from(e.target.files) })
              }
            />
          </label>
          {form.images.length > 0 && (
            <p className="mt-2 text-sm text-green-600">{form.images.length} images selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseForm;