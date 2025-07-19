"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

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

  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [tempCoords, setTempCoords] = useState({
    lat: 25.00835051211514,
    lng: 89.28396456979571,
  });

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
    <div className="grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl font-bold">🏢 Office Post Form</h2>

      <input name="union" value={form.union} onChange={handleChange} placeholder="Union" />
      <input name="area" value={form.area} onChange={handleChange} placeholder="Area" />
      <input name="roadNumber" value={form.roadNumber} onChange={handleChange} placeholder="Road Number" />
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
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
            ✅ Location: <b>{form.coordinates.lat}</b>, <b>{form.coordinates.lng}</b>
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

      <select name="rentOrSale" value={form.rentOrSale} onChange={handleChange}>
        <option value="rent">Rent</option>
        <option value="sale">Sale</option>
      </select>

      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
      <select name="officeType" value={form.officeType} onChange={handleChange}>
        <option value="">Select Office Type</option>
        <option value="commercial">Commercial</option>
        <option value="corporate">Corporate</option>
        <option value="co-working">Co-working</option>
        <option value="others">Others</option>
      </select>

      <input name="officeSize" value={form.officeSize} onChange={handleChange} placeholder="Office Size (sqft)" />
      <input name="floorNumber" value={form.floorNumber} onChange={handleChange} placeholder="Floor Number" />
      <input name="totalRooms" value={form.totalRooms} onChange={handleChange} placeholder="Total Rooms" />
      <input name="parkingSpaceCount" value={form.parkingSpaceCount} onChange={handleChange} placeholder="Parking Spaces" />

      <select name="furnishing" value={form.furnishing} onChange={handleChange}>
        <option value="">Furnishing</option>
        <option value="furnished">Furnished</option>
        <option value="semi-furnished">Semi-Furnished</option>
        <option value="unfurnished">Unfurnished</option>
      </select>

      <select name="ceilingType" value={form.ceilingType} onChange={handleChange}>
        <option value="">Ceiling Type</option>
        <option value="normal">Normal</option>
        <option value="falseCeiling">False Ceiling</option>
      </select>

      <select name="flooringType" value={form.flooringType} onChange={handleChange}>
        <option value="">Flooring</option>
        <option value="tiles">Tiles</option>
        <option value="marble">Marble</option>
        <option value="cement">Cement</option>
        <option value="wooden">Wooden</option>
      </select>

      <input type="date" name="availableFrom" value={form.availableFrom} onChange={handleChange} />
      <input name="contractPeriod" value={form.contractPeriod} onChange={handleChange} placeholder="Contract Period" />

      <div className="col-span-2">
        <label className="block mb-1 font-semibold">Features:</label>
        {featureList.map((feature) => (
          <label key={feature} className="mr-4">
            <input
              type="checkbox"
              value={feature}
              checked={form.features.includes(feature)}
              onChange={handleFeatureChange}
            />{" "}
            {feature}
          </label>
        ))}
      </div>

      <input
        type="file"
        multiple
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...Array.from(e.target.files)],
          }))
        }
        className="col-span-2"
      />

      <input
        type="file"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, video: e.target.files?.[0] }))
        }
        className="col-span-2"
      />
    </div>
  );
});

export default OfficeForm;