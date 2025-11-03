"use client";

// metarial icons import
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../utils/axiosInstance";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin" && !dataLoaded) {
      fetchAds();
      setDataLoaded(true);
    }
  }, [status, session, dataLoaded]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/ads");
      // Extract ads array from response (API now returns {ads, totalPages, currentPage})
      setAds(response.data.ads || response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch ads.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/ads/${id}`, { status: newStatus });
      setAds(
        ads.map((ad) => (ad._id === id ? { ...ad, status: newStatus } : ad))
      );
    } catch (err) {
      setError("Failed to update ad status.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      try {
        await axiosInstance.delete(`/ads/${id}`);
        setAds(ads.filter((ad) => ad._id !== id));
      } catch (err) {
        setError("Failed to delete ad.");
      }
    }
  };

  const handleFeatureToggle = async (id, newFeatured) => {
    try {
      await axiosInstance.put(`/ads/${id}`, { featured: newFeatured });
      setAds(
        ads.map((ad) => (ad._id === id ? { ...ad, featured: newFeatured } : ad))
      );
    } catch (err) {
      setError("Failed to update ad feature status.");
    }
  };

  const filteredAds = useMemo(() => {
    return ads
      .filter((ad) => {
        if (filter === "all") return true;
        return ad.status === filter;
      })
      .filter((ad) => {
        if (!searchTerm) return true;
        return (
          ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }, [ads, filter, searchTerm]);

  const stats = useMemo(() => {
    return {
      total: ads.length,
      pending: ads.filter((ad) => ad.status === "pending").length,
      approved: ads.filter((ad) => ad.status === "approved").length,
      rejected: ads.filter((ad) => ad.status === "rejected").length,
    };
  }, [ads]);

  if (loading || status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Ads</h2>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Approved</h2>
          <p className="text-2xl font-bold">{stats.approved}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Rejected</h2>
          <p className="text-2xl font-bold">{stats.rejected}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <label className="mr-2">Filter by status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by title or seller..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>

      {/* Ads Table */}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          {/* Total Count Display */}
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Seller</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAds.map((ad) => (
              <tr key={ad._id} className="border-b hover:bg-gray-50">
                <td>
                  <img
                    src={ad.images[0]}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4">{ad.title}</td>
                <td className="py-3 px-4">{ad.user?.name || ad.user?.email}</td>
                <td className="py-3 px-4">{ad.category}</td>
                <td className="py-3 px-4">{ad.price} <span className="text-sm">({ad.rentOrSale})</span></td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      {
                        pending: "bg-yellow-200 text-yellow-800",
                        approved: "bg-green-200 text-green-800",
                        rejected: "bg-red-200 text-red-800",
                      }[ad.status]
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex items-center space-x-2">
                  {ad.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(ad._id, "approved")}
                        className="text-green-600 hover:text-green-800 cursor-pointer group relative"
                      >

                        <CheckCircleIcon className="text-green-500" />
                        <span className="absolute left-[-80%] top-[-27] bg-black rounded-sm px-2 py-1 text-sm text-green-500 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 scale-0">Approve</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(ad._id, "rejected")}
                        className="text-red-600 hover:text-red-800 cursor-pointer group relative"
                      >
                        <RemoveCircleOutlineIcon className="text-red-500" />
                        <span className="absolute left-[-80%] top-[-27] bg-black rounded-sm px-2 py-1 text-sm text-red-500 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 scale-0">Reject</span>
                      </button>
                    </>
                  )}

                  <Link
                    href={`/ads/${ad._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 cursor-pointer relative group"
                  >
                    <PlayCircleOutlineOutlinedIcon />
                    <span className="bg-black rounded-sm px-2 py-1 text-sm text-blue-500 left-[-80%] absolute top-[-27] transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 scale-0">
                      Preview
                    </span>
                  </Link>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer group relative"
                  >
                    <DeleteOutlinedIcon className="text-red-500" />
                    <span className="bg-black rounded-sm px-2 py-1 text-sm text-red-500 left-[-80%] absolute top-[-27] transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 scale-0">
                      Delete
                    </span>
                  </button>

                  <button
                    onClick={() => handleFeatureToggle(ad._id, !ad.featured)}
                    className={`text-2xl cursor-pointer ${
                      ad.featured ? "text-yellow-500" : "text-gray-400"
                    } relative group`}
                  >
                    {ad.featured ? (
                      <FavoriteOutlinedIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                    <span className="bg-black px-2 py-1 rounded-sm absolute text-sm left-[-100%] top-[-24] transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-0">
                      Featured
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
