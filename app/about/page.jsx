"use client";
import React from "react";
// import { Home, Users, Target, Building } from "lucide-react";
import { SlTarget } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { BsFillBuildingsFill } from "react-icons/bs";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16">
        <div className="max-w-[1080px] mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">About B-Rent</h1>
          <p className="text-lg max-w-2xl mx-auto">
            B-Rent is your trusted house & property rental platform, designed
            exclusively for Bogura city. Whether you’re a house owner, a seller,
            or a renter, we connect you seamlessly.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-[1080px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-xl p-6 flex items-start gap-4">
          <SlTarget className="text-blue-600" size={32} />
          <div>
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To make property renting in Bogura city simple, transparent, and
              hassle-free by bringing landlords, sellers, and tenants on one
              platform.
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-start gap-4">
          <BsFillBuildingsFill className="text-green-600" size={32} />
          <div>
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To be Bogura’s most reliable real estate rental platform, helping
              thousands of people find their dream homes and spaces with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-[1080px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose B-Rent?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white shadow p-6 rounded-xl">
              <IoIosHome className="text-blue-500 mx-auto" size={40} />
              <h3 className="mt-4 font-semibold text-lg">Verified Properties</h3>
              <p className="text-gray-600 mt-2">
                Every ad is verified so you can trust what you see.
              </p>
            </div>

            <div className="bg-white shadow p-6 rounded-xl">
              <FaUser className="text-green-500 mx-auto" size={40} />
              <h3 className="mt-4 font-semibold text-lg">Easy Connection</h3>
              <p className="text-gray-600 mt-2">
                Connect directly with property owners & sellers without hassle.
              </p>
            </div>

            <div className="bg-white shadow p-6 rounded-xl">
              <BsFillBuildingsFill className="text-red-500 mx-auto" size={40} />
              <h3 className="mt-4 font-semibold text-lg">Focused on Bogura</h3>
              <p className="text-gray-600 mt-2">
                100% dedicated to Bogura city, making searches more accurate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team / Contact */}
      <div className="max-w-[1080px] mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          B-Rent is built by passionate developers and designers who want to
          solve real-life rental problems in Bogura. We believe in innovation,
          transparency, and community.
        </p>
        <div className="mt-6 text-gray-700">
          <p>Email: <span className="text-blue-600">support@brent.com</span></p>
          <p>Phone: <span className="text-blue-600">+880 1700-000000</span></p>
         
        </div>
      </div>
    </div>
  );
}
