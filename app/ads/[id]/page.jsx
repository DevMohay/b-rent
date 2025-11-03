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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiHeart, FiMessageCircle } from "react-icons/fi";

import moment from "moment";
import React, { useEffect, useState, useRef, use } from "react";
import axios from "../../../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import SellerInfo from "../../dashboard/sellerInfo";
import HouseDetails from "../../../components/details/house";
import LandDetails from "../../../components/details/land";
import MessDetails from "../../../components/details/mess";
import ShopDetails from "../../../components/details/shop";
import RestaurantDetails from "../../../components/details/resturant";
import Share from "../../../components/share";
import OfficeDetails from "../../../components/details/office";
import Loading from "../../loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 relative rounded-3xl overflow-hidden">
      {/* Main Image */}
      <div className="relative w-full h-[400px] md:h-[500px] group">
        {images?.[0] && (
          <motion.img
            whileHover={{ scale: 1.02 }}
            src={images[0]}
            alt="Main"
            onClick={() => openModal(0)}
            className="w-full h-full object-cover cursor-pointer transition-all duration-500"
          />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        {/* Mobile Show More Button */}
        {images.length > 1 && (
          <div className="absolute right-4 bottom-4 block md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(0)}
              className="px-5 py-3 bg-white/95 backdrop-blur-md text-gray-800 rounded-xl hover:bg-white shadow-2xl font-semibold flex items-center gap-2 border border-gray-200"
            >
              <CollectionsOutlinedIcon />
              <span>View All {images.length}</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Right-side 4 Images Grid (hidden on small devices) */}
      <div className="hidden md:grid grid-cols-2 gap-3 relative">
        {displayedImages.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="relative h-[245px] group overflow-hidden rounded-2xl"
          >
            <img
              src={image}
              alt={`Image ${index + 2}`}
              onClick={() => openModal(index + 1)}
              className="w-full h-full object-cover cursor-pointer transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}

        {/* Desktop See More Button */}
        {images.length > 5 && (
          <div className="absolute right-4 bottom-4 z-10">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(0)}
              className="px-6 py-3 bg-white/95 backdrop-blur-md text-gray-800 rounded-xl hover:bg-white shadow-2xl font-semibold flex items-center gap-2 border border-gray-200"
            >
              <CollectionsOutlinedIcon />
              <span>View All {images.length}</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white z-50 flex items-center justify-center transition-all duration-300 hover:scale-110"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white z-50 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <FaChevronLeft />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white z-50 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <FaChevronRight />
            </button>

            {/* Image Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full z-50">
              {selectedImageIndex + 1} / {images.length}
            </div>

            <div ref={modalRef} className="relative max-w-6xl w-full">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={images[selectedImageIndex]}
                alt="Preview"
                className="w-full h-auto max-h-[85vh] mx-auto rounded-2xl shadow-2xl"
              />

              {/* Thumbnails */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
                {images.map((img, idx) => (
                  <motion.img
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    src={img}
                    alt={`thumb-${idx}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(idx);
                    }}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                      idx === selectedImageIndex
                        ? "border-4 border-white shadow-xl scale-110"
                        : "border-2 border-white/30 opacity-70 hover:opacity-100"
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
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adUrl, setAdUrl] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await axios.get(`/ads/${id}`);
        setAd(response.data);
        if (typeof window !== "undefined") {
          setAdUrl(window.location.href);
        }
      } catch (err) {
        setError("Failed to fetch ad details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAdDetails();
  }, [id]);

  useEffect(() => {
    const checkWishlist = async () => {
      if (status === "authenticated" && id) {
        try {
          const res = await axios.get(`/wishlist?adId=${id}`);
          setWishlisted(!!res.data?.wishlisted);
        } catch (e) {
          // ignore and keep false
        }
      } else {
        setWishlisted(false);
      }
    };
    checkWishlist();
  }, [status, id]);

  const handleWishlistClick = async () => {
    if (status !== "authenticated") {
      router.push("/auth/login");
      return;
    }
    setWishlistLoading(true);
    try {
      if (wishlisted) {
        await axios.delete(`/wishlist?adId=${id}`);
        setWishlisted(false);
      } else {
        await axios.post(`/wishlist`, { adId: id });
        setWishlisted(true);
      }
    } catch (e) {
      // optional: show error toast
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center p-4">
        <Loading />
      </div>
    );
  if (error)
    return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!ad) return <div className="text-center p-4">Ad not found.</div>;

  const getPropertyHighlights = (icon) => {
    switch (icon) {
      case "size":
        return <CropIcon className="text-purple-600" />;
      case "bedrooms":
        return <HotelOutlinedIcon className="text-blue-600" />;
      case "bathrooms":
        return <BathtubOutlinedIcon className="text-teal-600" />;
      case "kitchen":
        return <CountertopsOutlinedIcon className="text-orange-600" />;
      case "balcony":
        return <BalconyOutlinedIcon className="text-green-600" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <MediaGallery images={ad.images} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price & Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-200"
            >
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold capitalize shadow-lg">
                  {ad.category}
                </span>
                <span
                  className={`inline-block ${
                    ad.rentOrSale === "rent"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-gradient-to-r from-purple-500 to-pink-600"
                  } text-white px-4 py-2 rounded-full text-sm font-bold capitalize shadow-lg`}
                >
                  For {ad.rentOrSale}
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-baseline gap-3 mb-2">
                  <h1 className="text-5xl md:text-6xl font-black text-gray-900">
                    ৳{ad.price?.toLocaleString() || ad.price}
                  </h1>
                  {ad.rentOrSale === "rent" && (
                    <span className="text-xl text-gray-500 font-medium">
                      /month
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {/* Message Button */}
                  {session?.user?.id !== ad.user?._id && (
                    <button
                      onClick={() => {
                        if (!session) {
                          router.push('/auth/login');
                          return;
                        }
                        router.push(`/messages/${ad._id}`);
                      }}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                    >
                      <FiMessageCircle className="text-xl" />
                      Message
                    </button>
                  )}

                  {/* Add to Wishlist Button */}
                  <button
                    onClick={handleWishlistClick}
                    disabled={wishlistLoading}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${
                      wishlisted
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white"
                    }`}
                  >
                    <FiHeart className={`text-xl ${wishlisted ? "fill-white" : ""}`} />
                    {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                </div>
              </div>

              {/* Location & Time */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start gap-3 text-gray-700">
                  <LocationOnIcon className="text-red-500 mt-1" />
                  <p className="text-lg">
                    <span className="font-semibold">
                      {ad.union || ad.location?.union}
                    </span>
                    , {ad.area || ad.location?.area}
                    {ad.roadNumber || ad.location?.roadNumber
                      ? `, Road ${ad.roadNumber || ad.location.roadNumber}`
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <AccessTimeIcon className="text-blue-500" />
                  <p>
                    Posted{" "}
                    <span className="font-semibold">
                      {moment(ad.createdAt || ad.updatedAt).fromNow()}
                    </span>
                  </p>
                </div>
              </div>

              {/* Property Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {ad.size && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300"
                  >
                    {getPropertyHighlights("size")}
                    <span className="text-sm font-bold text-gray-800">
                      {ad.size} sq ft
                    </span>
                  </motion.div>
                )}
                {ad.bedrooms && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300"
                  >
                    {getPropertyHighlights("bedrooms")}
                    <span className="text-sm font-bold text-gray-800">
                      {ad.bedrooms} Bed
                    </span>
                  </motion.div>
                )}
                {ad.bathrooms && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border border-teal-200 hover:shadow-lg transition-all duration-300"
                  >
                    {getPropertyHighlights("bathrooms")}
                    <span className="text-sm font-bold text-gray-800">
                      {ad.bathrooms} Bath
                    </span>
                  </motion.div>
                )}
                {ad.kitchen && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300"
                  >
                    {getPropertyHighlights("kitchen")}
                    <span className="text-sm font-bold text-gray-800">
                      {ad.kitchen} Kitchen
                    </span>
                  </motion.div>
                )}
                {ad.balcony && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300"
                  >
                    {getPropertyHighlights("balcony")}
                    <span className="text-sm font-bold text-gray-800">
                      {ad.balcony} Balcony
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {ad.category === "house" && <HouseDetails ad={ad} />}
              {ad.category === "land" && <LandDetails ad={ad} />}
              {ad.category === "mess" && <MessDetails ad={ad} />}
              {ad.category === "shop" && <ShopDetails ad={ad} />}
              {ad.category === "resturant" && <RestaurantDetails ad={ad} />}
              {ad.category === "office" && <OfficeDetails ad={ad} />}
            </motion.div>
          </div>

          {/* Right Section - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Seller Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200 sticky top-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                Seller Info
              </h2>
              <SellerInfo user={ad.user} adUrl={adUrl} />
            </motion.div>

            {/* Share Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200"
            >
              <Share ad={ad} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdDetailsPage;