"use client";
import React, { useState, useEffect } from "react";

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

  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [tempCoords, setTempCoords] = useState({
    lat: 25.00835051211514,
    lng: 89.28396456979571,
  });

  // 🔁 Parent কে notify করো form data change হলে
  useEffect(() => {
    if (onChange) onChange(form);
  }, [form, onChange]);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.gomaps.pro/maps/api/js?key=AlzaSyiACP085SUiZQT_y1CUi1s9YydI6EImm2k";
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
        navigator.geolocation?.getCurrentPosition(
          (pos) => {
            const position = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            map.setCenter(position);
            marker.setPosition(position);
            setTempCoords(position);
            radio.checked = true;
          },
          () => alert("Location access denied.")
        );
      };

      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(wrapper);
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
        : prev.amenities.filter((item) => item !== value),
    }));
  };

  return (
    <div className=" gap-4">
      <h2 className=" text-xl font-bold">🛏️ Mess Post Form</h2>

      <input
        name="union"
        value={form.union}
        onChange={handleChange}
        placeholder="Union"
      />
      <input
        name="area"
        value={form.area}
        onChange={handleChange}
        placeholder="Area"
      />
      <input
        name="roadNumber"
        value={form.roadNumber}
        onChange={handleChange}
        placeholder="Road No"
      />
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Ad Title"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="col-span-2"
      />

      <div className="col-span-2">
        <button
          type="button"
          onClick={() => setShowMap(true)}
          className="bg-gray-200 px-4 py-2 rounded border"
        >
          🗺️ Pick Location on Map
        </button>
        {form.coordinates.lat && form.coordinates.lng && (
          <p className="mt-2 text-sm text-gray-800">
            ✅ Location: <b>{form.coordinates.lat}</b>,{" "}
            <b>{form.coordinates.lng}</b>
          </p>
        )}
      </div>

      {showMap && (
        <div className="col-span-2 mt-4 border rounded overflow-hidden">
          <div id="google-map" className="w-full h-[400px]" />
          <div className="flex justify-between p-2 bg-gray-100">
            <button
              onClick={() => setShowMap(false)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setForm((prev) => ({ ...prev, coordinates: tempCoords }));
                setShowMap(false);
              }}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}



      <div className="flex flex-col gap-2">
        <select
          name="rentOrSale"
          value={form.rentOrSale}
          onChange={handleChange}
        >
          <option value="rent">Rent</option>
        </select>
        <br />


        
        <div className="my-2 flex flex-col ">
          <input
            type="number"
            name="singleRoomPrice"
            value={form.singleRoomPrice}
            onChange={handleChange}
            placeholder="Single Room Price"
            className="my-2"
          />
          <input
            type="number"
            name="doubleRoomPrice"
            value={form.doubleRoomPrice}
            onChange={handleChange}
            placeholder="Double Room Price"
            className="my-2"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="3 Bedded Room Price"
            className="my-2"
          />
        </div>
        <input
          name="size"
          value={form.size}
          onChange={handleChange}
          placeholder="Size (sqft)"
        />
        <input
          name="seatCount"
          value={form.seatCount}
          onChange={handleChange}
          placeholder="Total Seats"
        />
        <input
          name="floorNumbers"
          type="number"
          value={form.floorNumbers}
          onChange={handleChange}
          placeholder="Total Floors"
        />
        <div className="flex gap-4">
          <label className="block  font-semibold">Floor Type:</label>
          <select
            name="floorType"
            id=""
            onChange={handleChange}
            value={form.floorType}
          >
            <option value="tiles">টাইলস</option>
            <option value="marble">ঢালায়</option>
            <option value="wood">মাটি</option>
          </select>
        </div>
        <div className="flex font-semibold text-white items-center gap-4">
          <label className="ml-2">Roof:</label>

          <select
            name="roofType"
            value={form.roofType}
            onChange={handleChange}
            className="ml-2"
          >
            <option value="saad">ছাদ</option>
            <option value="TinShed">টিন শেড</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="balcony"
            checked={form.balcony}
            onChange={handleChange}
          />
          <label className="ml-2">Balcony</label>
        </div>
        <div>
          <input
            name="baranda"
            type="checkbox"
            checked={form.baranda}
            onChange={handleChange}
          />
          <label className="ml-2">Baranda</label>
        </div>

        {["commonRoom", "kitchen", "furnished"].map((field) => (
          <label key={field}>
            <input
              type="checkbox"
              name={field}
              checked={form[field]}
              onChange={handleChange}
            />{" "}
            {field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
          </label>
        ))}

        <div className="col-span-2">
          <label className="block mb-1 font-semibold">Amenities:</label>
          {[
            "Gas",
            "Electricity",
            "Water",
            "Internet",
            "Security Guard",
            "Parking",
          ].map((item) => (
            <label key={item} className="mr-4">
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
          onChange={(e) =>
            setForm((prev) => ({ ...prev, images: Array.from(e.target.files) }))
          }
          className="col-span-2"
        />
      </div>
    </div>
  );
}
