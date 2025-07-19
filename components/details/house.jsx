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

const HouseDetails = ({ ad }) => {
    const getAminityIcon = (name) => {
        switch (name) {
            case "Electricity":
                return <ElectricBoltOutlinedIcon />;
            case "Water":
                return <WaterOutlinedIcon />;
            case "Swimming Pool":
                return <PoolOutlinedIcon />;
            case "Lift":
                return <EscalatorOutlinedIcon />;
            case "Parking":
                return <DirectionsCarFilledOutlinedIcon />;
            case "Playground":
                return <SportsCricketOutlinedIcon />;
            case "Facebook Page":
                return <FacebookOutlinedIcon />;
            case "Internet":
                return <NetworkCheckOutlinedIcon />;
            case "furnished":
                return <ChairOutlinedIcon />;
            case "Security Camera":
                return <PiSecurityCameraBold className="text-2xl" />;
            case "Gas":
                return <PropaneTankOutlinedIcon />;
            default:
                return null;
        }
    };

    return (
        <div className=" mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">
                Apartment Details
            </h2>
            <div className="">
                <table className="min-w-full border border-gray-300 mb-4">
                    <tbody className="shadow-md">
                        <tr className="border-b border-gray-200 ">
                            <td className=" px-4 py-3 font-medium text-gray-700">
                                {ad.title}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 ">
                            <td className=" gap-2 px-4 py-3 font-medium text-gray-700 flex">
                                <h1 className="font-bold">Price: {ad.price}TK</h1>
                                <p>
                                    {ad.rentOrSale === "rent" ? <p>Per Month</p> : ""}
                                </p>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 ">
                            <td className=" px-4 py-3 font-medium text-gray-700">
                                {ad.bathrooms
                                    ? "Bathrooms: " + ad.bathrooms
                                    : "Bathrooms: Not specified"}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 ">
                            <td className=" px-4 py-3 font-medium text-gray-700">
                                {ad.floorNumbers
                                    ? `Floor: ${ad.floorNumbers}`
                                    : "Floor: Not specified"}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 ">
                            <td className=" px-4 py-3 font-medium text-gray-700">
                                {ad.totalFloors
                                    ? `Total Floors: ${ad.totalFloors}`
                                    : "Total Floors: Not specified"}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 ">
                            <td className=" px-4 py-3 font-medium text-gray-700">
                                {ad.drawingRoom
                                    ? "Drawing Room: Yes"
                                    : "Drawing Room: No"}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 ">
                            <td className=" px-4 py-3 font-medium text-gray-700">
                                {ad.diningRoom
                                    ? "Dining Room: Yes"
                                    : "Dining Room: No"}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 ">
                            <td className=" px-4 py-3 font-medium text-gray-700">
                                {ad.furnished
                                    ? "Furnished Status: Furnished"
                                    : "Furnished Status: Unfurnished"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="facilities bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-2">Facilities</h3>

                {ad.amenities && ad.amenities.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {ad.amenities.map((amenity, index) => (
                            <div
                                key={index}
                                className="flex items-center text-gray-700 gap-2"
                            >
                                {getAminityIcon(amenity)}
                                <span>{amenity}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700">No amenities specified</p>
                )}
            </div>
        </div>
    );
};

export default HouseDetails;
