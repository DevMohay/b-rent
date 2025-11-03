import React from 'react';

const RestaurantDetails = ({ ad }) => {
    const featureItem = (label, value) => (
        <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-lg font-medium text-gray-800">{value ?? '—'}</p>
        </div>
    );

    return (
        <div className="mt-4 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Restaurant Details</h2>
                        <p className="text-gray-500 mt-1">Key attributes and features</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-2xl font-bold text-green-600">৳{ad.price?.toLocaleString?.() || ad.price}</p>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">{ad.rentOrSale === 'rent' ? 'For Rent' : 'For Sale'}</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featureItem('Title', ad.title)}
                    {featureItem('Type', ad.restaurantType)}
                    {featureItem('Size (sq ft)', ad.size)}
                    {featureItem('Total Floors', ad.totalFloors)}
                    {featureItem('Seating Capacity', ad.seatingCapacity)}
                    {featureItem('AC Rooms', ad.acRooms)}
                    {featureItem('Outdoor Seating', ad.outdoorSeating ? 'Yes' : 'No')}
                    {featureItem('Party Hall', ad.partyHall ? 'Yes' : 'No')}
                    {featureItem('Kitchen Type', ad.kitchenType)}
                    {featureItem('Gas Line', ad.gasLine ? 'Available' : 'Not Available')}
                    {featureItem('Electricity', ad.electricity ? 'Available' : 'Not Available')}
                    {featureItem('Generator', ad.generator ? 'Available' : 'Not Available')}
                    {featureItem('Water Supply', ad.waterSupply ? 'Available' : 'Not Available')}
                    {featureItem('Fire Safety', ad.fireSafety ? 'Available' : 'Not Available')}
                    {featureItem('Parking Space', ad.parkingSpace ? 'Available' : 'Not Available')}
                    {featureItem('Lift', ad.lift ? 'Available' : 'Not Available')}
                    {featureItem('Equipment Included', ad.equipmentIncluded ? 'Yes' : 'No')}
                    {featureItem('Furniture Included', ad.furnitureIncluded ? 'Yes' : 'No')}
                    {featureItem('Display Counter', ad.displayCounter ? 'Yes' : 'No')}
                    {featureItem('Fridge Included', ad.fridgeIncluded ? 'Yes' : 'No')}
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                    <p className="mt-2 text-gray-700 leading-relaxed">{ad.description}</p>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
