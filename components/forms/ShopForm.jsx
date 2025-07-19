"use client";
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

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
    frontWidth: "",
    height: "",
    storeRoom: false,
    electricity: false,
    water: false,
    generator: false,
    ac: false,
    glassFront: false,
    shutter: false,
    parking: false,
    readyToUse: "",
    usedFor: "",
    images: [],
    video: null,
  });

  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [tempCoords, setTempCoords] = useState({
    lat: 25.00835051211514,
    lng: 89.28396456979571,
  });
  const [selectedCoords, setSelectedCoords] = useState(null);

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
        frontWidth: "",
        height: "",
        storeRoom: false,
        electricity: false,
        water: false,
        generator: false,
        ac: false,
        glassFront: false,
        shutter: false,
        parking: false,
        readyToUse: "",
        usedFor: "",
        images: [],
        video: null,
      }));
    },
  }));

  useEffect(() => {
    if (onChange) onChange(form);
  }, [form, onChange]);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AlzaSyiACP085SUiZQT_y1CUi1s9YydI6EImm2k`;
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
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImages = (e) => {
    setForm((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleVideo = (e) => {
    setForm((prev) => ({ ...prev, video: e.target.files[0] }));
  };

  const handleLocationConfirm = () => {
    setSelectedCoords(tempCoords);
    setForm((prev) => ({
      ...prev,
      coordinates: { lat: tempCoords.lat, lng: tempCoords.lng },
    }));
    setShowMap(false);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">📍 Location Info</h2>
      <input
        className="input"
        name="union"
        value={form.union}
        onChange={handleChange}
        placeholder="Union Name"
      />
      <input
        className="input"
        name="area"
        value={form.area}
        onChange={handleChange}
        placeholder="Area Name"
      />
      <input
        className="input"
        name="roadNumber"
        value={form.roadNumber}
        onChange={handleChange}
        placeholder="Road Number"
      />
      <input
        className="input"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        className="input"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <button
        type="button"
        onClick={() => setShowMap(true)}
        className="bg-gray-200 px-4 py-2 rounded border"
      >
        📍 Pick Location on Map
      </button>
      {selectedCoords && (
        <p className="text-sm text-gray-700 mt-1">
          Location: {selectedCoords.lat}, {selectedCoords.lng}
        </p>
      )}

      {showMap && (
        <div className="col-span-2 mt-4 border rounded overflow-hidden">
          <div id="google-map" className="w-full h-[400px]" />
          <div className="flex justify-between p-2 bg-gray-100">
            <button
              type="button"
              onClick={() => setShowMap(false)}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleLocationConfirm}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold">🏪 Basic Info</h2>
      <select
        className="input"
        name="rentOrSale"
        value={form.rentOrSale}
        onChange={handleChange}
      >
        <option value="rent">Rent</option>
        <option value="sale">Sale</option>
      </select>
      <input
        className="input"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <select
        className="input"
        name="shopType"
        value={form.shopType}
        onChange={handleChange}
      >
        <option value="">Select Shop Type</option>
        <option value="grocery">Grocery</option>
        <option value="clothing">Clothing</option>
        <option value="electronics">Electronics</option>
        <option value="pharmacy">Pharmacy</option>
        <option value="mobile">Mobile</option>
        <option value="others">Others</option>
      </select>
      <input
        className="input"
        name="size"
        type="number"
        value={form.size}
        onChange={handleChange}
        placeholder="Shop Size (sq.ft)"
      />

      <h2 className="text-lg font-semibold">🧱 Structure</h2>
      <input
        className="input"
        name="floorNumber"
        value={form.floorNumber}
        onChange={handleChange}
        placeholder="Floor Number"
      />
      <input
        className="input"
        name="frontWidth"
        value={form.frontWidth}
        onChange={handleChange}
        placeholder="Front Width (feet)"
      />
      <input
        className="input"
        name="height"
        value={form.height}
        onChange={handleChange}
        placeholder="Height (feet)"
      />
      <label>
        <input
          type="checkbox"
          name="storeRoom"
          checked={form.storeRoom}
          onChange={handleChange}
        />{" "}
        Attached Store Room
      </label>

      <h2 className="text-lg font-semibold">⚙️ Facilities</h2>
      {[
        "electricity",
        "water",
        "generator",
        "ac",
        "glassFront",
        "shutter",
        "parking",
      ].map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            name={item}
            checked={form[item]}
            onChange={handleChange}
          />{" "}
          {item.charAt(0).toUpperCase() +
            item.slice(1).replace(/([A-Z])/g, " $1")}
        </label>
      ))}

      <h2 className="text-lg font-semibold">📦 Utilities</h2>
      <label>
        <input
          type="radio"
          name="readyToUse"
          value="yes"
          checked={form.readyToUse === "yes"}
          onChange={handleChange}
        />{" "}
        Ready-to-use
      </label>
      <label>
        <input
          type="radio"
          name="readyToUse"
          value="no"
          checked={form.readyToUse === "no"}
          onChange={handleChange}
        />{" "}
        Empty
      </label>
      {form.readyToUse === "no" && (
        <input
          className="input"
          name="usedFor"
          value={form.usedFor}
          onChange={handleChange}
          placeholder="Previously used for?"
        />
      )}

      <h2 className="text-lg font-semibold">📸 Media</h2>
      <input className="input" type="file" multiple onChange={handleImages} />
      <input className="input" type="file" onChange={handleVideo} />
    </div>
  );
});

export default ShopForm;


// শোন বিষয় টা হচ্ছে এমন যে, আমার app এ তো অনেক গুলো seller এবং অনেক গুলো buyer থাকবে। তো seller যারা আছে তারা তাদের house, land, shop ইত্যাদি post করবে। এবং প্রতিটা seller এর dashboard এ তাদের নিজেদের post দেখতে পাবে, delete করতে পারবে
// শোন আমার app এ role মডেল আছে ৩টা , seller, buyer, admin। seller ad post করতে পারবে, তার dashboard এ তার পোস্ট গুলো দেখতে পাবে, delete করতে পারবে। update ও করতে পারবে।আর buyer সব গুলো post দেখতে পারবে। search,filter , sort করতে পারবে। আর admin সব গুলো post দেখতে পারবে, delete করতে পারবে, admin নিজে ad post করতে পারবে 