// File: app/(ads)/ads/[id]/page.jsx
"use client";

// import icons
import CloseIcon from "@mui/icons-material/Close";
import CropIcon from "@mui/icons-material/Crop";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import CountertopsOutlinedIcon from "@mui/icons-material/CountertopsOutlined";
import BalconyOutlinedIcon from "@mui/icons-material/BalconyOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";

import moment from "moment";
import Navbar from "../../../components/Navbar";
import React, { useEffect, useState, useRef } from "react";
import axios from "../../../utils/axiosInstance";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BedOutlined, KitchenOutlined } from "@mui/icons-material";
import SellerInfo from "../../dashboard/sellerInfo";
import HouseDetails from "../../../components/details/house";
import LandDetails from "../../../components/details/land";
import MessDetails from "../../../components/details/mess";
import ShopDetails from "../../../components/details/shop";
import RestaurantDetails from "../../../components/details/resturant";
import Share from "../../../components/share";
import OfficeDetails from "../../../components/details/office";

const MediaGallery = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const modalRef = useRef(null);
  const startX = useRef(null);

  const openModal = (index) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const nextImage = () =>
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    if (diff > 50) nextImage();
    else if (diff < -50) prevImage();
  };

  const displayedImages = showMore ? images.slice(1) : images.slice(1, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md mb-4 relative">
      {/* Main Image */}
      <div className="relative w-full h-full">
        {images?.[0] && (
          <motion.img
            whileHover={{ scale: 1.03 }}
            src={images[0]}
            alt="Main"
            onClick={() => openModal(0)}
            className="w-full h-full object-cover rounded-md cursor-pointer shadow"
          />
        )}

        {/* Mobile Show More Button */}
        {images.length > 5 && (
          <div className="absolute right-4 bottom-4 text-center block md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(0)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <CollectionsOutlinedIcon className="inline mr-2" />
              {showMore ? "Show Less" : `Show All ${images.length} Photos`}
            </motion.button>
          </div>
        )}
      </div>

      {/* Right-side 4 Images Grid (hidden on small devices) */}
      <div className="hidden md:grid grid-cols-2 gap-2 relative">
        {displayedImages.map((image, index) => (
          <motion.img
            whileHover={{ scale: 1.05 }}
            key={index}
            src={image}
            alt={`Image ${index + 2}`}
            onClick={() => openModal(index + 1)}
            className="w-full h-full object-cover rounded-md cursor-pointer"
          />
        ))}

        {/* Desktop See More Button */}
        {images.length > 5 && (
          <div className="absolute right-4 bottom-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(0)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <CollectionsOutlinedIcon className="inline mr-2" />
              {showMore ? "Show Less" : `See All ${images.length} Photos`}
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center "
            onClick={handleBackdropClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="z-50">
              <button
                className="top-10 right-20 w-10 h-10 absolute text-2xl bg-gray-700 rounded-full text-white z-10"
                onClick={closeModal}
              >
                {" "}
                <CloseIcon />
              </button>
            </div>
            <div
              ref={modalRef}
              className="relative max-w-4xl w-full p-4 bg-red-400 z-[-10]"
            >
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={images[selectedImageIndex]}
                alt="Preview"
                className="w-full h-auto max-h-[80vh] mx-auto rounded z"
              />

              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 object-cover rounded border cursor-pointer ${
                      idx === selectedImageIndex ? "border-white border-2" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function AdDetailsPage({ params }) {
  const { id } = params;
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await axios.get(`/ads/${id}`);
        setAd(response.data);
      } catch (err) {
        setError("Failed to fetch ad details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAdDetails();
  }, [id]);

  if (loading)
    return <div className="text-center p-4">Loading ad details...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!ad) return <div className="text-center p-4">Ad not found.</div>;

  const getPropertyHighlights = (icon) => {
    switch (icon) {
      case "size":
        return <CropIcon />;
      case "bedrooms":
        return <HotelOutlinedIcon />;
      case "bathrooms":
        return <BathtubOutlinedIcon />;
      case "kitchen":
        return <CountertopsOutlinedIcon />;
      case "balcony":
        return <BalconyOutlinedIcon />;
    }
  };

  return (
    <div className="bg-white min-h-screen ">
      <div className="container md:max-w-6xl lg:max-w-5xl mx-auto p-4">
        <MediaGallery images={ad.images} />

        <div className="details-container flex flex-col  md:flex-row justify-center  lg:flex-row rounded-lg shadow-md gap-4">
          <div className="left w-full">
            <div className="price text-black  p-2 md:p-4 lg:p-6 rounded-lg shadow-md">
              <span className=" capitalize font-bold ">
                {ad.category} for {ad.rentOrSale} , Posted{" "}
              </span>
              <span className="">
                {moment(ad.createdAt || ad.updatedAt).fromNow()}
              </span>
              <br />

              <span className="flex gap-2">
                <h1 className="font-bold">{ad.price}TK</h1>
                <p>{ad.rentOrSale === "rent" ? <p>Per Month</p> : ""}</p>
              </span>
              <span>
                Address: {ad.union || ad.location.union},{" "}
                {ad.area || ad.location.area},{" "}
                {ad.roadNumber || ad.location.roadNumber} Road
              </span>
              <div className="gap-6 font-bold flex flex-wrap p-2 insight-shadow">
                {ad.size ? (
                  <span className="items-center p-2 md:p-4 lg:p-4 ">{getPropertyHighlights("size")} {ad.size} sq. ft.</span>
                ) : ''}
                {ad.bedrooms ? (
                  <span className="items-center p-2 md:p-4 lg:p-4 ">{getPropertyHighlights("bedrooms")} {ad.bedrooms} Bed</span>
                ) : ''}
                {ad.bathrooms ? (
                  <span className="items-center p-2 md:p-4 lg:p-4 ">{getPropertyHighlights("bathrooms")} {ad.bathrooms} Bath</span>
                ) : ''}
                {ad.kitchen ? (
                  <span className="items-center p-2 md:p-4 lg:p-4 ">{getPropertyHighlights("kitchen")} {ad.kitchen} Kitchen</span>
                ) : ''}
                {ad.balcony ? (
                  <span className="items-center p-2 md:p-4 lg:p-4 ">{getPropertyHighlights("balcony")} {ad.balcony} Balcony</span>
                ) : ''}
              </div>
            </div>

            <div className="detail text-black  gap-4">
              {ad.category === "house" && <HouseDetails ad={ad} />}
              {ad.category === "land" && <LandDetails ad={ad} />}
              {ad.category === "mess" && <MessDetails ad={ad} />}
              {ad.category === "shop" && <ShopDetails ad={ad} />}
              {ad.category === "resturant" && <RestaurantDetails ad={ad} />}
              {ad.category === "office" && <OfficeDetails ad={ad} />}
            </div>
          </div>

          <div className="right w-full lg:w-[60%]">
            <div className="seller-info bg-white rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">
                Seller Information
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <SellerInfo user={ad.user} />
              </div>
            </div>
            <Share ad={ad} />
            <div className="eim"></div>
            <div className="share"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdDetailsPage;
