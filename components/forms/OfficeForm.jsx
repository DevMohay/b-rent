"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import MapPicker from "../ui/MapPicker";

const OfficeForm = forwardRef(({ onChange }, ref) => {
  const [form, setForm] = useState({
    union: "",
    area: "",
    roadNumber: "",
    title: "",
    description: "",
    rentOrSale: "rent",
    price: "",
    officeType: "",
    officeSize: "",
    floorNumber: "",
    totalRooms: "",
    parkingSpaceCount: "",
    furnishing: "",
    ceilingType: "",
    flooringType: "",
    availableFrom: "",
    contractPeriod: "",
    coordinates: { lat: "", lng: "" },
    features: [],
    images: [],
    video: null,
  });

  // Map selection handled by MapPicker component

  const featureList = [
    "conferenceRoom",
    "receptionArea",
    "parkingSpace",
    "liftAccess",
    "generatorBackup",
    "securityGuard",
    "cctvCoverage",
    "separateEntrance",
    "electricityAvailable",
    "waterAvailable",
    "internet",
    "airConditioning",
    "kitchen",
  ];

  useEffect(() => {
    if (onChange) onChange(form);
  }, [form, onChange]);

  useImperativeHandle(ref, () => ({
    getFormData: () => form,
  }));


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      features: checked
        ? [...prev.features, value]
        : prev.features.filter((item) => item !== value),
    }));
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🏢 Office Information</h2>
        
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
                placeholder="Enter a descriptive title for your office" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Provide detailed information about your office space"
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
        
        {/* Office Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Office Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Office Type</label>
              <select 
                name="officeType" 
                value={form.officeType} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Office Type</option>
                <option value="commercial">Commercial</option>
                <option value="corporate">Corporate</option>
                <option value="co-working">Co-working</option>
                <option value="others">Others</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Office Size (sqft)</label>
              <input 
                name="officeSize" 
                value={form.officeSize} 
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Rooms</label>
              <input 
                name="totalRooms" 
                value={form.totalRooms} 
                onChange={handleChange} 
                placeholder="Enter total number of rooms" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parking Spaces</label>
              <input 
                name="parkingSpaceCount" 
                value={form.parkingSpaceCount} 
                onChange={handleChange} 
                placeholder="Enter number of parking spaces" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Furnishing</label>
              <select 
                name="furnishing" 
                value={form.furnishing} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Furnishing Type</option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ceiling Type</label>
              <select 
                name="ceilingType" 
                value={form.ceilingType} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Ceiling Type</option>
                <option value="normal">Normal</option>
                <option value="falseCeiling">False Ceiling</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flooring Type</label>
              <select 
                name="flooringType" 
                value={form.flooringType} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Flooring Type</option>
                <option value="tiles">Tiles</option>
                <option value="marble">Marble</option>
                <option value="cement">Cement</option>
                <option value="wooden">Wooden</option>
              </select>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Contract Period (months)</label>
              <input 
                name="contractPeriod" 
                value={form.contractPeriod} 
                onChange={handleChange} 
                placeholder="Enter contract period" 
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Features & Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {featureList.map((feature) => (
              <label key={feature} className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  value={feature}
                  checked={form.features.includes(feature)}
                  onChange={handleFeatureChange}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-sm capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Media */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Property Media</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Images (Multiple)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    images: [...prev.images, ...Array.from(e.target.files)],
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {form.images.length > 0 && (
                <p className="mt-1 text-sm text-green-600">{form.images.length} image(s) selected</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video (Optional)</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, video: e.target.files?.[0] }))
                }
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

export default OfficeForm;