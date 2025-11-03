"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import MapPicker from "../ui/MapPicker";

const LandForm = forwardRef(({ onChange }, ref) => {
  const [form, setForm] = useState({
    union: "",
    area: "",
    roadNumber: "",
    coordinates: { lat: "", lng: "" },
    rentOrSale: "rent",
    title: "",
    description: "",
    listingType: "sale",
    price: "",
    size: "",
    landType: "Residential",
    facingRoad: false,
    boundaryWall: false,
    images: [],
  });

  // Notify parent on form change
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

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
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
              name="listingType" 
              value={form.listingType} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
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
          value={form.coordinates}
          onChange={(coords) =>
            setForm((prev) => ({ ...prev, coordinates: coords }))
          }
          buttonLabel="Pick Location on Map"
        />
      </div>
      
      {/* Land Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Land Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Land Type</label>
            <select
              name="landType"
              value={form.landType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="facingRoad"
                name="facingRoad"
                checked={form.facingRoad}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="facingRoad" className="ml-2 block text-sm text-gray-700">Facing Road</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="boundaryWall"
                name="boundaryWall"
                checked={form.boundaryWall}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="boundaryWall" className="ml-2 block text-sm text-gray-700">Boundary Wall</label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Images Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Property Images</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
          </label>
        </div>
        
        {form.images.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Images ({form.images.length})</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {form.images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${idx}`}
                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default LandForm;