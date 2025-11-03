"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import MapPicker from "../ui/MapPicker";

const RestaurantForm = forwardRef(({ onChange }, ref) => {
  const [form, setForm] = useState({
    union: "",
    area: "",
    roadNumber: "",
    coordinates: null,
    title: "",
    description: "",
    rentOrSale: "",
    price: "",
    restaurantType: "",
    size: "",
    totalFloors: "",
    seatingCapacity: "",
    acRooms: false,
    outdoorSeating: false,
    partyHall: false,
    kitchenType: "",
    gasLine: false,
    electricity: false,
    generator: false,
    waterSupply: false,
    fireSafety: false,
    parkingSpace: "",
    lift: false,
    equipmentIncluded: false,
    furnitureIncluded: false,
    displayCounter: false,
    fridgeIncluded: false,
    availableFrom: "",
    businessStatus: "",
    contractMonths: "",
    photos: [],
    video: null,
  });

  // Map selection handled by MapPicker component

  // Sync with parent
  useEffect(() => {
    if (onChange) onChange(form);
  }, [form, onChange]);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      if (name === "photos") {
        setForm((prev) => ({ ...prev, photos: Array.from(files) }));
      } else {
        setForm((prev) => ({ ...prev, video: files[0] }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Map selection handled by MapPicker

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    getFormData: () => form,
    triggerSubmit: () => {
      console.log("🔽 Form Submitted Data:", form);
      // Optionally post here via axios
    },
    resetForm: () => setForm((prev) => ({ ...prev, ...initialForm })),
  }));

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🍽️ Restaurant Information</h2>
        
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                placeholder="Enter a descriptive title for your restaurant" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Provide detailed information about your restaurant space"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
              <select 
                name="rentOrSale" 
                value={form.rentOrSale} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (BDT)</label>
              <input 
                name="price" 
                value={form.price} 
                onChange={handleChange} 
                placeholder="Enter price" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Location Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Location Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Union</label>
              <input 
                name="union" 
                value={form.union} 
                onChange={handleChange} 
                placeholder="Enter union" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <input 
                name="area" 
                value={form.area} 
                onChange={handleChange} 
                placeholder="Enter area" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Road Number</label>
              <input 
                name="roadNumber" 
                value={form.roadNumber} 
                onChange={handleChange} 
                placeholder="Enter road number" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Map Location</label>
              <MapPicker
                value={form.coordinates}
                onChange={(coords) => setForm((prev) => ({ ...prev, coordinates: coords }))}
                buttonLabel="Pick Location on Map"
              />
            </div>
          </div>
        </div>
        
        {/* Restaurant Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Restaurant Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Type</label>
              <select 
                name="restaurantType" 
                value={form.restaurantType} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Restaurant Type</option>
                <option value="fastFood">Fast Food</option>
                <option value="casual">Casual Dining</option>
                <option value="fineDining">Fine Dining</option>
                <option value="cafe">Cafe</option>
                <option value="buffet">Buffet</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size (sqft)</label>
              <input 
                name="size" 
                value={form.size} 
                onChange={handleChange} 
                placeholder="Enter size in square feet" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Floors</label>
              <input 
                name="totalFloors" 
                value={form.totalFloors} 
                onChange={handleChange} 
                placeholder="Enter total floors" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seating Capacity</label>
              <input 
                name="seatingCapacity" 
                value={form.seatingCapacity} 
                onChange={handleChange} 
                placeholder="Enter seating capacity" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kitchen Type</label>
              <select 
                name="kitchenType" 
                value={form.kitchenType} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Kitchen Type</option>
                <option value="open">Open Kitchen</option>
                <option value="closed">Closed Kitchen</option>
                <option value="semi">Semi-Open Kitchen</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parking Space</label>
              <input 
                name="parkingSpace" 
                value={form.parkingSpace} 
                onChange={handleChange} 
                placeholder="Enter parking capacity" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available From</label>
              <input 
                type="date" 
                name="availableFrom" 
                value={form.availableFrom} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Status</label>
              <select 
                name="businessStatus" 
                value={form.businessStatus} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Business Status</option>
                <option value="running">Currently Running</option>
                <option value="closed">Closed</option>
                <option value="new">New Setup</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contract Period (months)</label>
              <input 
                name="contractMonths" 
                value={form.contractMonths} 
                onChange={handleChange} 
                placeholder="Enter contract period" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Features & Amenities */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Features & Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="acRooms"
                checked={form.acRooms}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">AC Rooms</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="outdoorSeating"
                checked={form.outdoorSeating}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Outdoor Seating</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="partyHall"
                checked={form.partyHall}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Party Hall</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="gasLine"
                checked={form.gasLine}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Gas Line</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="electricity"
                checked={form.electricity}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Electricity</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="generator"
                checked={form.generator}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Generator</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="waterSupply"
                checked={form.waterSupply}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Water Supply</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="fireSafety"
                checked={form.fireSafety}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Fire Safety</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="lift"
                checked={form.lift}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Lift</span>
            </label>
          </div>
        </div>
        
        {/* Equipment & Furnishing */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Equipment & Furnishing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="equipmentIncluded"
                checked={form.equipmentIncluded}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Equipment Included</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="furnitureIncluded"
                checked={form.furnitureIncluded}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Furniture Included</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="displayCounter"
                checked={form.displayCounter}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Display Counter</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="fridgeIncluded"
                checked={form.fridgeIncluded}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Fridge Included</span>
            </label>
          </div>
        </div>
        
        {/* Media */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Property Media</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photos (Multiple)</label>
              <input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {form.photos.length > 0 && (
                <p className="mt-1 text-sm text-green-600">{form.photos.length} photo(s) selected</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video (Optional)</label>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {form.video && (
                <p className="mt-1 text-sm text-green-600">Video selected: {form.video.name}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Modal removed; MapPicker handles selection */}
    </div>
  );
});

export default RestaurantForm;