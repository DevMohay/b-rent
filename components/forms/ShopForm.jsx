"use client";
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import MapPicker from "../ui/MapPicker";

const ShopForm = forwardRef(({ onChange }, ref) => {
  const [form, setForm] = useState({
    union: "",
    area: "",
    roadNumber: "",
    title: "",
    description: "",
    coordinates: { lat: "", lng: "" },
    rentOrSale: "rent",
    price: "",
    shopType: "",
    size: "",
    floorNumber: "",
    frontageWidth: "",
    ceilingHeight: "",
    availableFrom: "",
    minLeasePeriod: "",
    cornerShop: false,
    mainRoadFacing: false,
    parking: false,
    airConditioned: false,
    bathroom: false,
    waterSupply: false,
    electricity: false,
    gasConnection: false,
    securitySystem: false,
    displayArea: false,
    storageRoom: false,
    furnishingIncluded: false,
    signageFacility: false,
    photos: [],
    video: null,
  });

  // Map selection handled by MapPicker component

  useImperativeHandle(ref, () => ({
    getFormData: () => ({ ...form, rentOrSale: form.rentOrSale }),
    submit: () => {
      console.log("Submitting Shop Form:", { ...form, rentOrSale: form.rentOrSale });
      return { ...form, rentOrSale: form.rentOrSale };
    },
    reset: () => {
      setForm((prev) => ({
        ...prev,
        union: "",
        area: "",
        roadNumber: "",
        title: "",
        description: "",
        coordinates: { lat: "", lng: "" },
        rentOrSale: "rent",
        price: "",
        shopType: "",
        size: "",
        floorNumber: "",
        frontageWidth: "",
        ceilingHeight: "",
        availableFrom: "",
        minLeasePeriod: "",
        cornerShop: false,
        mainRoadFacing: false,
        parking: false,
        airConditioned: false,
        bathroom: false,
        waterSupply: false,
        electricity: false,
        gasConnection: false,
        securitySystem: false,
        displayArea: false,
        storageRoom: false,
        furnishingIncluded: false,
        signageFacility: false,
        photos: [],
        video: null,
      }));
    },
  }));

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

  const handleImages = (e) => {
    setForm((prev) => ({ ...prev, photos: Array.from(e.target.files) }));
  };

  const handleVideo = (e) => {
    setForm((prev) => ({ ...prev, video: e.target.files[0] }));
  };

  // Map selection handled by MapPicker

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🏪 Shop Information</h2>
        
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
                placeholder="Enter a descriptive title for your shop" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Provide detailed information about your shop space"
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
                onChange={(coords) =>
                  setForm((prev) => ({ ...prev, coordinates: coords }))
                }
                buttonLabel="Pick Location on Map"
              />
            </div>
          </div>
        </div>
        
        {/* Shop Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Shop Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shop Type</label>
              <select 
                name="shopType" 
                value={form.shopType} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Shop Type</option>
                <option value="retail">Retail</option>
                <option value="grocery">Grocery</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="pharmacy">Pharmacy</option>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Floor Number</label>
              <input 
                name="floorNumber" 
                value={form.floorNumber} 
                onChange={handleChange} 
                placeholder="Enter floor number" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frontage Width (ft)</label>
              <input 
                name="frontageWidth" 
                value={form.frontageWidth} 
                onChange={handleChange} 
                placeholder="Enter frontage width" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ceiling Height (ft)</label>
              <input 
                name="ceilingHeight" 
                value={form.ceilingHeight} 
                onChange={handleChange} 
                placeholder="Enter ceiling height" 
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Lease Period (months)</label>
              <input 
                name="minLeasePeriod" 
                value={form.minLeasePeriod} 
                onChange={handleChange} 
                placeholder="Enter minimum lease period" 
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
                name="cornerShop"
                checked={form.cornerShop}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Corner Shop</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="mainRoadFacing"
                checked={form.mainRoadFacing}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Main Road Facing</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="parking"
                checked={form.parking}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Parking Available</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="airConditioned"
                checked={form.airConditioned}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Air Conditioned</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="bathroom"
                checked={form.bathroom}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Bathroom</span>
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
                name="gasConnection"
                checked={form.gasConnection}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Gas Connection</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="securitySystem"
                checked={form.securitySystem}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Security System</span>
            </label>
          </div>
        </div>
        
        {/* Additional Features */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Additional Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="displayArea"
                checked={form.displayArea}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Display Area</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="storageRoom"
                checked={form.storageRoom}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Storage Room</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="furnishingIncluded"
                checked={form.furnishingIncluded}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Furnishing Included</span>
            </label>
            
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="signageFacility"
                checked={form.signageFacility}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm">Signage Facility</span>
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
      
      {/* Map Modal removed; MapPicker handles selection in a modal */}
    </div>
  );
});

export default ShopForm;

