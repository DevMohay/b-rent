"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import HouseForm from "../../components/forms/HouseForm";
import MessForm from "../../components/forms/MessForm";
import OfficeForm from "../../components/forms/OfficeForm";
import RestaurantForm from "../../components/forms/RestaurantForm";
import ShopForm from "../../components/forms/ShopForm";
import LandForm from "../../components/forms/LandForm";
import Link from "next/link";
import axiosInstance from "../../utils/axiosInstance";

export default function PostAdPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const [isEditMode, setIsEditMode] = useState(false);
  const [category, setCategory] = useState("house");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch ad data when in edit mode
  useEffect(() => {
    if (editId) {
      setLoading(true);
      setIsEditMode(true);
      
      const fetchAdData = async () => {
        try {
          const response = await axiosInstance.get(`/ads/${editId}`);
          const adData = response.data;
          
          // Set category
          setCategory(adData.category);
          
          // Prepare form data
          const { location, ...rest } = adData;
          const initialData = {
            ...rest,
            ...location,
            // Don't include images/video as they can't be pre-filled in file inputs
          };
          
          setFormData(initialData);
        } catch (err) {
          console.error("Error fetching ad data:", err);
          setError("Failed to load ad data for editing");
        } finally {
          setLoading(false);
        }
      };
      
      fetchAdData();
    }
  }, [editId]);

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    console.log("Selected category:", category);
    setError(null);
    setSubmitting(true);

    if (!session || (session.user.role !== "user" && session.user.role !== "seller" && session.user.role !== "admin")) {
      setError("You must be logged in as a user, seller, or admin to post an ad.");
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
      let response;
      
      if (isEditMode) {
        // Update existing ad
        response = await axiosInstance.put(`/ads/${editId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Ad updated successfully:", response.data);
      } else {
        // Create new ad
        response = await axiosInstance.post("/ads", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Ad posted successfully:", response.data);
      }
      
      router.push("/dashboard");
    } catch (err) {
      console.error(`Error ${isEditMode ? 'updating' : 'posting'} ad:`, err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'post'} ad`);
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
  
  if (session.user.role !== 'user' && session.user.role !== 'seller' && session.user.role !== 'admin') {
     return <div>Access Denied. You must be a user, seller, or admin to view this page.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {isEditMode ? 'Edit Your Property Ad' : 'Post Your Property Ad'}
              </h1>
              <p className="text-red-100 mt-1">
                {isEditMode ? 'Update the details of your property listing' : 'Fill in the details to list your property'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-semibold text-gray-800">Property Type</h2>
                    <p className="text-gray-500 text-sm">Select the type of property you want to list</p>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
                      required
                    >
                      <option value="house">🏠 House</option>
                      <option value="mess">🏘️ Mess</option>
                      <option value="shop">🏪 Shop</option>
                      <option value="restaurant">🍽️ Restaurant</option>
                      <option value="office">🏢 Office</option>
                      <option value="land">🏞️ Land</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
                {category === "house" && <HouseForm onChange={handleFormChange} />}
                {category === "mess" && <MessForm onChange={handleFormChange} />}
                {category === "shop" && <ShopForm onChange={handleFormChange} />}
                {category === "restaurant" && <RestaurantForm onChange={handleFormChange} />}
                {category === "office" && <OfficeForm onChange={handleFormChange} />}
                {category === "land" && <LandForm onChange={handleFormChange} />}
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-colors duration-300 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      {isEditMode ? 'Update Advertisement' : 'Post Advertisement'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
