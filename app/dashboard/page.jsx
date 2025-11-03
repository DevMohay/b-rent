"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import SellerDashboard from "../seller/dashboard/page";
import AdminDashboard from "../admin/dashboard/page";
import { FiMail, FiPhone, FiUser, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';

function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Please log in to access the dashboard.
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-gray-100">
     

      {/* Header */}
      <div className="max-w-[1080px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Welcome to your Dashboard,{" "}
          <span className="text-blue-600">{user.name || user.email}</span>!
        </h1>

        {/* User Profile Card */}
       <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-white via-white to-blue-50 rounded-3xl shadow-2xl p-8 border border-gray-200 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-30 blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full opacity-30 blur-3xl -ml-24 -mb-24"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Profile Picture Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          <div className="relative">
            <img
              src={user.profilePicture || "/default-avatar.png"}
              alt="Profile Picture"
              className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-2xl ring-4 ring-blue-200"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
          </div>
        </motion.div>

        {/* User Info Section */}
        <div className="flex-1 w-full space-y-4">
          {/* Name */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FiUser className="text-blue-600 text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                  Full Name
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {user.name || "Not Provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FiMail className="text-purple-600 text-xl" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                  Email Address
                </p>
                <p className="text-lg font-bold text-gray-800 truncate">
                  {user.email || "Not Provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FiPhone className="text-green-600 text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                  Phone Number
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {user.phone || "Not Provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 group"
            onClick={() => signOut()}
          >
            <FiLogOut className="text-2xl group-hover:rotate-180 transition-transform duration-500" />
            <span>Sign Out</span>
          </motion.button>
        </div>
      </div>
    </motion.div>

        {/* Role-based Sections */}
        <div className="mt-10 space-y-8">
          {user.role === "admin" && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Admin Panel
              </h2>
              <p className="text-gray-600 mb-4">
                As an admin, you can manage all users and ads.
              </p>
              <AdminDashboard />
            </div>
          )}

          {(user.role === "user" || user.role === "seller") && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {user.role === "seller" ? "Seller Dashboard" : "User Dashboard"}
              </h2>
              <p className="text-gray-600 mb-4">
                You can view, post, update, and delete your ads here.
              </p>
              <div className="mt-4 flex flex-col space-y-4">
                <a href="/post-ad" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow transition-all text-center">
                  Post a New Ad
                </a>
                <SellerDashboard />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
