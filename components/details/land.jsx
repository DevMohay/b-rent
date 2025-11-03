import React from 'react';

const LandDetails = ({ ad }) => {
    return (
        <div className="mt-4 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Land Details</h2>
                        <p className="text-gray-500 mt-1">Key attributes and features</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-2xl font-bold text-green-600">৳{ad.price?.toLocaleString?.() || ad.price}</p>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">{ad.rentOrSale === 'rent' ? 'For Rent' : 'For Sale'}</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Land Type</p>
                        <p className="text-lg font-medium text-gray-800">{ad.landType ?? '—'}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Size (sq ft)</p>
                        <p className="text-lg font-medium text-gray-800">{ad.size ?? '—'}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Facing Road</p>
                        <p className="text-lg font-medium text-gray-800">{ad.facingRoad ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Boundary Wall</p>
                        <p className="text-lg font-medium text-gray-800">{ad.boundaryWall ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Coordinates</p>
                        <p className="text-lg font-medium text-gray-800">{ad.location?.coordinates ? `${ad.location.coordinates.lat}, ${ad.location.coordinates.lng}` : '—'}</p>
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

export default LandDetails;
