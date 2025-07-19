"use client";
import React, { useState, useEffect } from "react";

export default function HouseForm({ onChange }) {
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

  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [tempCoords, setTempCoords] = useState({ lat: 25.0083, lng: 89.2839 });

  useEffect(() => {
    if (onChange) {
      onChange(form); // Send form data to parent whenever it changes
    }
  }, [form, onChange]);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://maps.gomaps.pro/maps/api/js?key=AlzaSyc63WZ7pf2DBDRDLqUIwvSNTf2m2iswMug";
      script.async = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (showMap && mapLoaded) {
      const map = new window.google.maps.Map(
        document.getElementById("google-map"),
        {
          center: tempCoords,
          zoom: 15,
        }
      );

      const marker = new window.google.maps.Marker({
        position: tempCoords,
        map,
        draggable: true,
      });

      marker.addListener("dragend", (e) => {
        setTempCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      });
    }
  }, [showMap, mapLoaded]);

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
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* form fields like before */}
      <input name="union" placeholder="Union" value={form.union} onChange={handleChange} />
      <input name="area" placeholder="Area" value={form.area} onChange={handleChange} />
      <input name="roadNumber" placeholder="Road No" value={form.roadNumber} onChange={handleChange} />
      <input name="title" placeholder="Ad Title" value={form.title} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="col-span-2" />
      
      <button type="button" onClick={() => setShowMap(true)} className="col-span-2 bg-black px-3 py-2 rounded">
        📍 Pick Location
      </button>
      
       {form.coordinates.lat && form.coordinates.lng && (
          <p className="mt-2 text-sm text-gray-800">
            ✅ Location: <b>{form.coordinates.lat}</b>, <b>{form.coordinates.lng}</b>
          </p>
        )}

      {showMap && (
        <div className="col-span-2">
          <div id="google-map" className="w-full h-[400px] mt-4 rounded border" />
          <div className="mt-2 flex justify-between">
            <button onClick={() => setShowMap(false)} className="px-3 py-1 bg-red-500 text-white rounded">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setForm((prev) => ({ ...prev, coordinates: tempCoords }));
                setShowMap(false);
              }}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}

      {/* other inputs */}
      <select name="rentOrSale" value={form.rentOrSale} onChange={handleChange}>
        <option value="rent">Rent</option>
        <option value="sale">Sale</option>
      </select>
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
      <input name="size" placeholder="Size" value={form.size} onChange={handleChange} />
      <input name="bedrooms" placeholder="Bedrooms" value={form.bedrooms} onChange={handleChange} />
      <input name="bathrooms" placeholder="Bathrooms" value={form.bathrooms} onChange={handleChange} />
      <input name="floorNumber" placeholder="Floor Number" value={form.floorNumber} onChange={handleChange} />
      <input name="totalFloors" placeholder="Total Floors" value={form.totalFloors} onChange={handleChange} />
      <input name="balconyCount" placeholder="Balconies" value={form.balconyCount} onChange={handleChange} />
      <input name="kitchenCount" placeholder="Kitchens" value={form.kitchenCount} onChange={handleChange} />

      <label><input type="checkbox" name="drawingRoom" checked={form.drawingRoom} onChange={handleChange} /> Drawing Room</label>
      <label><input type="checkbox" name="diningRoom" checked={form.diningRoom} onChange={handleChange} /> Dining Room</label>
      <label><input type="checkbox" name="furnished" checked={form.furnished} onChange={handleChange} /> Furnished</label>

      <div className="col-span-2">
        <label>Amenities:</label>
        {["Gas", "Electricity", "Water", "Internet", "Lift", "Generator", "Parking", "Security Guard"].map((item) => (
          <label key={item} className="inline-block mr-4">
            <input
              type="checkbox"
              value={item}
              checked={form.amenities.includes(item)}
              onChange={handleAmenities}
            />{" "}
            {item}
          </label>
        ))}
      </div>

      <input
        type="file"
        multiple
        className="col-span-2"
        onChange={(e) =>
          setForm({ ...form, images: Array.from(e.target.files) })
        }
      />
    </div>
  );
}