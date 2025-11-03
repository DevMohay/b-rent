import React from 'react';
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import WaterOutlinedIcon from "@mui/icons-material/WaterOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import EscalatorOutlinedIcon from "@mui/icons-material/EscalatorOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import SportsCricketOutlinedIcon from "@mui/icons-material/SportsCricketOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import NetworkCheckOutlinedIcon from "@mui/icons-material/NetworkCheckOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import PropaneTankOutlinedIcon from "@mui/icons-material/PropaneTankOutlined";
import { PiSecurityCameraBold } from "react-icons/pi";
import { FaBed, FaBath, FaRulerCombined, FaBuilding, FaDoorOpen } from "react-icons/fa";
import { MdBalcony, MdKitchen } from "react-icons/md";
import { GiSofa, GiKnifeFork } from "react-icons/gi";

const HouseDetails = ({ ad }) => {
    const getAminityIcon = (name) => {
        switch (name) {
            case "Electricity":
                return <ElectricBoltOutlinedIcon className="text-yellow-500" />;
            case "Water":
                return <WaterOutlinedIcon className="text-blue-500" />;
            case "Swimming Pool":
                return <PoolOutlinedIcon className="text-cyan-500" />;
            case "Lift":
                return <EscalatorOutlinedIcon className="text-gray-600" />;
            case "Parking":
                return <DirectionsCarFilledOutlinedIcon className="text-indigo-600" />;
            case "Playground":
                return <SportsCricketOutlinedIcon className="text-green-600" />;
            case "Facebook Page":
                return <FacebookOutlinedIcon className="text-blue-600" />;
            case "Internet":
                return <NetworkCheckOutlinedIcon className="text-purple-600" />;
            case "furnished":
                return <ChairOutlinedIcon className="text-amber-600" />;
            case "Security Camera":
                return <PiSecurityCameraBold className="text-2xl text-red-600" />;
            case "Gas":
                return <PropaneTankOutlinedIcon className="text-orange-500" />;
            default:
                return null;
        }
    };

    const propertyFeatures = [
        { 
            icon: <FaBed className="text-2xl text-blue-600" />, 
            label: 'Bedrooms', 
            value: ad.bedrooms ?? '—',
            color: 'from-blue-50 to-blue-100',
            iconBg: 'bg-blue-100'
        },
        { 
            icon: <FaBath className="text-2xl text-teal-600" />, 
            label: 'Bathrooms', 
            value: ad.bathrooms ?? '—',
            color: 'from-teal-50 to-teal-100',
            iconBg: 'bg-teal-100'
        },
        { 
            icon: <FaRulerCombined className="text-2xl text-purple-600" />, 
            label: 'Size', 
            value: ad.size ? `${ad.size} sq ft` : '—',
            color: 'from-purple-50 to-purple-100',
            iconBg: 'bg-purple-100'
        },
        { 
            icon: <FaBuilding className="text-2xl text-indigo-600" />, 
            label: 'Floor', 
            value: ad.floorNumber ?? ad.floorNumbers ?? '—',
            color: 'from-indigo-50 to-indigo-100',
            iconBg: 'bg-indigo-100'
        },
        { 
            icon: <FaDoorOpen className="text-2xl text-amber-600" />, 
            label: 'Total Floors', 
            value: ad.totalFloors ?? '—',
            color: 'from-amber-50 to-amber-100',
            iconBg: 'bg-amber-100'
        },
        { 
            icon: <MdBalcony className="text-2xl text-green-600" />, 
            label: 'Balconies', 
            value: ad.balconyCount ?? '—',
            color: 'from-green-50 to-green-100',
            iconBg: 'bg-green-100'
        },
        { 
            icon: <MdKitchen className="text-2xl text-orange-600" />, 
            label: 'Kitchens', 
            value: ad.kitchenCount ?? ad.kitchen ?? '—',
            color: 'from-orange-50 to-orange-100',
            iconBg: 'bg-orange-100'
        },
        { 
            icon: <GiSofa className="text-2xl text-pink-600" />, 
            label: 'Drawing Room', 
            value: ad.drawingRoom ? 'Yes' : 'No',
            color: 'from-pink-50 to-pink-100',
            iconBg: 'bg-pink-100'
        },
        { 
            icon: <GiKnifeFork className="text-2xl text-rose-600" />, 
            label: 'Dining Room', 
            value: ad.diningRoom ? 'Yes' : 'No',
            color: 'from-rose-50 to-rose-100',
            iconBg: 'bg-rose-100'
        },
    ];

    return (
        <div className="mt-6 space-y-6 max-w-7xl mx-auto px-4">
            {/* Hero Section - Price & Type */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
                
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
                                {ad.rentOrSale === 'rent' ? '🏠 For Rent' : '💰 For Sale'}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-2">Property Overview</h2>
                            <p className="text-blue-100 text-lg">Everything you need to know about this property</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-sm text-blue-100 mb-1">Price</p>
                            <p className="text-5xl md:text-6xl font-black">
                                ৳{ad.price?.toLocaleString?.() || ad.price}
                            </p>
                            <p className="text-blue-100 mt-2">{ad.rentOrSale === 'rent' ? 'per month' : 'total'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Property Features Grid */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <span className="w-2 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                    Property Features
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {propertyFeatures.map((feature, index) => (
                        <div 
                            key={index} 
                            className={`group relative bg-gradient-to-br ${feature.color} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`${feature.iconBg} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-medium mb-1">{feature.label}</p>
                                    <p className="text-2xl font-bold text-gray-800">{feature.value}</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Description Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl p-8 border border-gray-200">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <span className="w-2 h-10 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></span>
                    Description
                </h3>
                <div className="bg-white rounded-2xl p-6 shadow-md">
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                        {ad.description || 'No description provided for this property.'}
                    </p>
                </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <span className="w-2 h-10 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></span>
                    Amenities & Facilities
                </h3>
                
                {ad.amenities && ad.amenities.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {ad.amenities.map((amenity, index) => (
                            <div 
                                key={index} 
                                className="group flex items-center gap-3 px-5 py-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-100 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <div className="text-2xl group-hover:scale-125 transition-transform duration-300">
                                    {getAminityIcon(amenity)}
                                </div>
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                                    {amenity}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">No amenities specified for this property</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HouseDetails;