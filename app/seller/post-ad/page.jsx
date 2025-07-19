"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HouseForm from "../../../components/forms/HouseForm";
import MessForm from "../../../components/forms/MessForm";
import OfficeForm from "../../../components/forms/OfficeForm";
import RestaurantForm from "../../../components/forms/RestaurantForm";
import ShopForm from "../../../components/forms/ShopForm";
import LandForm from "../../../components/forms/LandForm";
import Link from "next/link";
import axiosInstance from "../../../utils/axiosInstance";

export default function PostAdPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [category, setCategory] = useState("house");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    console.log("Selected category:", category);
    setError(null);
    setSubmitting(true);

    if (!session || (session.user.role !== "seller" && session.user.role !== "admin")) {
      setError("You must be logged in as a seller or admin to post an ad.");
      setSubmitting(false);
      return;
    }

    const data = new FormData();
    const { union, area, roadNumber, coordinates, ...restOfFormData } = formData;
    const location = { union, area, roadNumber, coordinates };
    const body = { ...restOfFormData, category, location };

    data.append("data", JSON.stringify(body));

    if (formData.images) {
      for (const image of formData.images) {
        data.append('images', image);
      }
    }

    if (formData.video) {
      data.append('video', formData.video);
    }

    try {
      const response = await axiosInstance.post("/ads", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Ad posted successfully:", response.data);
      router.push("/dashboard");
    } catch (err) {
      console.error("Error posting ad:", err);
      setError(err.response?.data?.message || "Failed to post ad");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated" || !session) {
    return <div>Access Denied. You must be logged in to view this page.</div>;
  }
  
  if (session.user.role !== 'seller' && session.user.role !== 'admin') {
     return <div>Access Denied. You must be a seller or admin to view this page.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto p-4 max-w-2xl bg-black">
        <Link href="/">Home</Link>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Post a New Advertisement
        </h1>
        <div className="bg-black p-8 rounded-lg shadow-lg">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-400">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 bg-black block w-full border border-gray-600 rounded-md shadow-sm p-3 text-white"
              required
            >
              <option value="house">House</option>
              <option value="mess">Mess</option>
              <option value="shop">Shop</option>
              <option value="restaurant">Restaurant</option>
              <option value="office">Office</option>
              <option value="land">Land</option>
            </select>
          </div>

          <div className="mt-6">
            {category === "house" && <HouseForm onChange={handleFormChange} />}
            {category === "mess" && <MessForm onChange={handleFormChange} />}
            {category === "shop" && <ShopForm onChange={handleFormChange} />}
            {category === "restaurant" && <RestaurantForm onChange={handleFormChange} />}
            {category === "office" && <OfficeForm onChange={handleFormChange} />}
            {category === "land" && <LandForm onChange={handleFormChange} />}
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {submitting ? "Submitting..." : "Post Advertisement"}
          </button>
        </div>
      </div>
    </form>
  );
}
