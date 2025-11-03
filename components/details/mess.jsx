import React from "react";

const MessDetails = ({ ad }) => {
    const priceItem = (label, value) => (
        <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-lg font-medium text-gray-800">{value ? `৳${value}` : '—'}</p>
        </div>
    );

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
                        <h2 className="text-2xl font-bold text-gray-800">Mess Details</h2>
                        <p className="text-gray-500 mt-1">Room types, amenities, and pricing</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-2xl font-bold text-green-600">৳{ad.price?.toLocaleString?.() || ad.price}</p>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">{ad.rentOrSale === 'rent' ? 'For Rent' : 'For Sale'}</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {priceItem('Single Room Price', ad.singleRoomPrice)}
                    {priceItem('Double Room Price', ad.doubleRoomPrice)}
                    {priceItem('Triple Room Price', ad.tripleRoomPrice)}
                    {priceItem('AC Room Price', ad.acRoomPrice)}
                    {priceItem('Non-AC Room Price', ad.nonAcRoomPrice)}
                    {priceItem('Attach Bath Price', ad.attachBathPrice)}
                    {priceItem('Common Bath Price', ad.commonBathPrice)}
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800">Amenities</h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {featureItem('Meal Included', ad.mealIncluded ? 'Yes' : 'No')}
                        {featureItem('Laundry Service', ad.laundryService ? 'Available' : 'Not Available')}
                        {featureItem('WiFi', ad.wifi ? 'Available' : 'Not Available')}
                        {featureItem('Generator', ad.generator ? 'Available' : 'Not Available')}
                        {featureItem('Water Supply', ad.waterSupply ? 'Available' : 'Not Available')}
                        {featureItem('Common Room', ad.commonRoom ? 'Available' : 'Not Available')}
                        {featureItem('Kitchen Access', ad.kitchenAccess ? 'Available' : 'Not Available')}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                    <p className="mt-2 text-gray-700 leading-relaxed">{ad.description}</p>
                </div>
            </div>
        </div>
    );
};

export default MessDetails;
