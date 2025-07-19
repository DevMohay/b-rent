import mongoose from 'mongoose';

const adSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rentOrSale: {
      type: String,
      required: true,
      enum: ['rent', 'sale'],
    },
    category: {
      type: String,
      required: true,
      enum: ['house', 'land', 'mess', 'shop', 'restaurant', 'office'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    featured: {
      type: Boolean,
      default: false,
    },

    // Media
    images: [
      {
        type: String,
      },
    ],
    video: {
      type: String,
    },

    // 📍 Location
    location: {
      union: String,
      area: String,
      roadNumber: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    // 🏠 Common Property Fields
    size: Number,
    bedrooms: Number,
    bathrooms: Number,
    floorNumber: Number,
    totalFloors: Number,
    balconyCount: Number,
    drawingRoom: Boolean,
    diningRoom: Boolean,
    kitchenCount: Number,
    furnished: Boolean,
    amenities: [String],

    // 🌱 Land Specific
    landType: String, // Residential, Commercial, Agricultural
    facingRoad: Boolean,
    boundaryWall: Boolean,

    // 🛏️ Mess Specific
    seatCount: Number,
    commonRoom: Boolean,
    kitchen: Boolean, // Also for Office
    floorType: String, // Tiles, Marble, etc.
    floorNumbers: Number, // For Mess, can be used for Office too
    // For Mess
    roofType: String, // Type of Roof (e.g., Flat, Sloped)
    baranda: Boolean, // For Mess
    singleRoomPrice: Number, // For Mess
    doubleRoomPrice: Number, // For Mess
    balcony: Boolean, // For Mess

    // 🏢 Office Specific
    officeType: String,
    totalRooms: Number,
    parkingSpaceCount: Number,
    ceilingType: String,
    flooringType: String,
    availableFrom: Date,
    contractPeriod: String,
    features: {
      conferenceRoom: Boolean,
      receptionArea: Boolean,
      parkingSpace: Boolean,
      liftAccess: Boolean,
      generatorBackup: Boolean,
      securityGuard: Boolean,
      cctvCoverage: Boolean,
      separateEntrance: Boolean,
      electricityAvailable: Boolean,
      waterAvailable: Boolean,
      internet: Boolean,
      airConditioning: Boolean,
    },

    // 🍽️ Restaurant Specific
    restaurantType: String,
    seatingCapacity: Number,
    acRooms: Boolean,
    outdoorSeating: Boolean,
    partyHall: Boolean,
    kitchenType: String,
    gasLine: Boolean,
    fireSafety: Boolean,
    equipmentIncluded: Boolean,
    furnitureIncluded: Boolean,
    displayCounter: Boolean,
    fridgeIncluded: Boolean,
    businessStatus: String, // running, closed
    contractMonths: Number,

    // 🛍️ Shop Specific
    shopType: String,
    frontWidth: Number,
    height: Number,
    storeRoom: Boolean,
    glassFront: Boolean,
    shutter: Boolean,
    readyToUse: String, // yes, no
    usedFor: String,
  },
  { timestamps: true }
);

export default mongoose.models.Ad || mongoose.model('Ad', adSchema);
