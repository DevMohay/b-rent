"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

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

  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [tempCoords, setTempCoords] = useState({ lat: 25.0083, lng: 89.2839 });

  // Sync with parent
  useEffect(() => {
    if (onChange) onChange(form);
  }, [form, onChange]);

  // Load map
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
      script.async = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (showMap && mapLoaded) {
      const map = new window.google.maps.Map(document.getElementById("google-map"), {
        center: tempCoords,
        zoom: 15,
      });

      const marker = new window.google.maps.Marker({
        position: tempCoords,
        map,
        draggable: true,
      });

      marker.addListener("dragend", (e) => {
        setTempCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      });

      const wrapper = document.createElement("div");
      wrapper.style.cssText =
        "background:#fff;padding:12px;margin:10px;border-radius:5px;border:2px solid #ccc;display:flex;align-items:center;gap:6px;cursor:pointer";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "locationOption";
      radio.id = "use-my-location";

      const label = document.createElement("label");
      label.htmlFor = "use-my-location";
      label.textContent = "My Location";

      wrapper.appendChild(radio);
      wrapper.appendChild(label);

      wrapper.onclick = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const lat = pos.coords.latitude;
              const lng = pos.coords.longitude;
              const position = { lat, lng };
              map.setCenter(position);
              marker.setPosition(position);
              setTempCoords(position);
              radio.checked = true;
            },
            () => alert("Location access denied.")
          );
        } else {
          alert("Geolocation not supported.");
        }
      };

      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(wrapper);
    }
  }, [showMap, mapLoaded]);

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

  const confirmLocation = () => {
    setForm((prev) => ({ ...prev, coordinates: tempCoords }));
    setShowMap(false);
  };

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
    <div className="grid grid-cols-2 gap-4">
      <input name="union" value={form.union} onChange={handleChange} placeholder="Union" />
      <input name="area" value={form.area} onChange={handleChange} placeholder="Area" />
      <input name="roadNumber" value={form.roadNumber} onChange={handleChange} placeholder="Road Number" />
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <textarea name="description" value={form.description} onChange={handleChange} className="col-span-2" placeholder="Description" />

      <button type="button" onClick={() => setShowMap(true)} className="col-span-2 bg-gray-200 px-4 py-2 rounded">
        📍 Pick Location
      </button>
      {form.coordinates && (
        <div className="col-span-2 text-sm text-gray-700">
          📌 Selected: {form.coordinates.lat}, {form.coordinates.lng}
        </div>
      )}

      {showMap && (
        <div className="col-span-2 mt-4 border rounded overflow-hidden">
          <div id="google-map" className="w-full h-[400px]" />
          <div className="flex justify-between p-2 bg-gray-100">
            <button onClick={() => setShowMap(false)} className="bg-red-600 text-white px-4 py-2 rounded">Cancel</button>
            <button onClick={confirmLocation} className="bg-blue-600 text-white px-4 py-2 rounded">Confirm Location</button>
          </div>
        </div>
      )}

      


      <div className="col-span-2">
        <label>
          <input
            type="radio"
            name="rentOrSale"
            value="rent"
            checked={form.rentOrSale === "rent"}
            onChange={handleChange}
          />{" "}
          Rent
        </label>
        <label>
          <input
            type="radio"
            name="rentOrSale"
            value="sale"
            checked={form.rentOrSale === "sale"}
            onChange={handleChange}
          />{" "}
          Sale
        </label>
      </div>

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <select
        name="restaurantType"
        value={form.restaurantType}
        onChange={handleChange}
      >
        <option value="">Type</option>
        <option value="fast_food">Fast Food</option>
        <option value="family">Family</option>
        <option value="cafe">Café</option>
        <option value="fine_dining">Fine Dining</option>
        <option value="buffet">Buffet</option>
        <option value="bakery">Bakery</option>
      </select>
      <input
        type="number"
        name="size"
        value={form.size}
        onChange={handleChange}
        placeholder="Size (sq.ft)"
      />
      <input
        type="number"
        name="totalFloors"
        value={form.totalFloors}
        onChange={handleChange}
        placeholder="Total Floor(s)"
      />
      <input
        type="number"
        name="seatingCapacity"
        value={form.seatingCapacity}
        onChange={handleChange}
        placeholder="Seating Capacity"
      />

      <label>
        <input
          type="checkbox"
          name="acRooms"
          checked={form.acRooms}
          onChange={handleChange}
        />{" "}
        AC Rooms
      </label>
      <label>
        <input
          type="checkbox"
          name="outdoorSeating"
          checked={form.outdoorSeating}
          onChange={handleChange}
        />{" "}
        Outdoor Seating
      </label>
      <label>
        <input
          type="checkbox"
          name="partyHall"
          checked={form.partyHall}
          onChange={handleChange}
        />{" "}
        Party Hall
      </label>

      <select
        name="kitchenType"
        value={form.kitchenType}
        onChange={handleChange}
      >
        <option value="">Kitchen Type</option>
        <option value="fully">Fully Setup</option>
        <option value="semi">Semi</option>
        <option value="none">None</option>
      </select>

      {/* Facilities */}
      <label>
        <input
          type="checkbox"
          name="gasLine"
          checked={form.gasLine}
          onChange={handleChange}
        />{" "}
        Gas Line
      </label>
      <label>
        <input
          type="checkbox"
          name="electricity"
          checked={form.electricity}
          onChange={handleChange}
        />{" "}
        Electricity
      </label>
      <label>
        <input
          type="checkbox"
          name="generator"
          checked={form.generator}
          onChange={handleChange}
        />{" "}
        Generator Backup
      </label>
      <label>
        <input
          type="checkbox"
          name="waterSupply"
          checked={form.waterSupply}
          onChange={handleChange}
        />{" "}
        Water Supply
      </label>
      <label>
        <input
          type="checkbox"
          name="fireSafety"
          checked={form.fireSafety}
          onChange={handleChange}
        />{" "}
        Fire Safety Equipment
      </label>
      <input
        type="number"
        name="parkingSpace"
        value={form.parkingSpace}
        onChange={handleChange}
        placeholder="Parking (vehicles)"
      />
      <label>
        <input
          type="checkbox"
          name="lift"
          checked={form.lift}
          onChange={handleChange}
        />{" "}
        Lift Access
      </label>

      {/* Equipment */}
      <label>
        <input
          type="checkbox"
          name="equipmentIncluded"
          checked={form.equipmentIncluded}
          onChange={handleChange}
        />{" "}
        Cooking Equipment
      </label>
      <label>
        <input
          type="checkbox"
          name="furnitureIncluded"
          checked={form.furnitureIncluded}
          onChange={handleChange}
        />{" "}
        Furniture
      </label>
      <label>
        <input
          type="checkbox"
          name="displayCounter"
          checked={form.displayCounter}
          onChange={handleChange}
        />{" "}
        Display Counter
      </label>
      <label>
        <input
          type="checkbox"
          name="fridgeIncluded"
          checked={form.fridgeIncluded}
          onChange={handleChange}
        />{" "}
        Fridge Included
      </label>

      {/* Others */}
      <input
        type="date"
        name="availableFrom"
        value={form.availableFrom}
        onChange={handleChange}
      />
      <div className="col-span-2">
        <label>
          <input
            type="radio"
            name="businessStatus"
            value="running"
            checked={form.businessStatus === "running"}
            onChange={handleChange}
          />{" "}
          Running
        </label>
        <label>
          <input
            type="radio"
            name="businessStatus"
            value="closed"
            checked={form.businessStatus === "closed"}
            onChange={handleChange}
          />{" "}
          Closed
        </label>
      </div>
      <input
        type="number"
        name="contractMonths"
        value={form.contractMonths}
        onChange={handleChange}
        placeholder="Minimum Contract (months)"
      />

      {/* Media */}
       <input type="file" name="photos" multiple onChange={handleChange} />
      <input type="file" name="video" onChange={handleChange} />
    </div>
  );
});

export default RestaurantForm;