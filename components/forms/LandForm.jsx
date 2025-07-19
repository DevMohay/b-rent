"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

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

  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [tempCoords, setTempCoords] = useState({ lat: 25.0083, lng: 89.2839 });

  // Notify parent on form change
  useEffect(() => {
    if (onChange) onChange(form);
  }, [form, onChange]);

  useImperativeHandle(ref, () => ({
    getFormData: () => form,
  }));

  // Load Google Maps
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.gomaps.pro/maps/api/js?key=AlzaSys0FA2WgwgdDOs1X-i8Eq3FpcsMfSdla_I";
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

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const confirmLocation = () => {
    setForm((prev) => ({
      ...prev,
      coordinates: { ...tempCoords },
    }));
    setShowMap(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-lg font-semibold">🌍 Land Listing Form</h2>

      <input
        className="input"
        name="union"
        value={form.union}
        onChange={handleChange}
        placeholder="Union"
      />
      <input
        className="input"
        name="area"
        value={form.area}
        onChange={handleChange}
        placeholder="Area"
      />
      <input
        className="input"
        name="roadNumber"
        value={form.roadNumber}
        onChange={handleChange}
        placeholder="Road Number"
      />

      <div className="col-span-2">
        <button
          type="button"
          onClick={() => setShowMap(true)}
          className="bg-gray-200 px-4 py-2 rounded border"
        >
          📍 Pick Location on Map
        </button>
        {form.coordinates.lat && (
          <p className="text-sm text-gray-700 mt-1">
            ✅ Selected: <b>{form.coordinates.lat}</b>, <b>{form.coordinates.lng}</b>
          </p>
        )}
      </div>

      {showMap && (
        <div className="col-span-2 mt-4 border rounded overflow-hidden">
          <div id="google-map" className="w-full h-[400px]" />
          <div className="flex justify-between p-2 bg-gray-100">
            <button
              type="button"
              onClick={() => setShowMap(false)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmLocation}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}

      <input
        className="input col-span-2"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        className="input col-span-2"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <select
        name="listingType"
        value={form.listingType}
        onChange={handleChange}
        className="input col-span-2"
      >
        <option value="sale">Sale</option>
        <option value="rent">Rent</option>
      </select>

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="input"
      />
      <input
        type="number"
        name="size"
        value={form.size}
        onChange={handleChange}
        placeholder="Land Size (sq.ft)"
        className="input"
      />

      <select
        name="landType"
        value={form.landType}
        onChange={handleChange}
        className="input col-span-2"
      >
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Agricultural">Agricultural</option>
      </select>

      <label className="col-span-2">
        <input
          type="checkbox"
          name="facingRoad"
          checked={form.facingRoad}
          onChange={handleChange}
        />{" "}
        Facing Road
      </label>

      <label className="col-span-2">
        <input
          type="checkbox"
          name="boundaryWall"
          checked={form.boundaryWall}
          onChange={handleChange}
        />{" "}
        Boundary Wall
      </label>

      <input
        className="col-span-2"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
});

export default LandForm;