import React from 'react';

const LandDetails = ({ ad }) => {
    return (
        <div className=" mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">
                Land Details
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
                                Land Area: {ad.size} sq.ft
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LandDetails;
