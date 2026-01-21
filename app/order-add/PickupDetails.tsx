"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";

type Step1Props = {
  setOpenPickupSidebar: (value: boolean) => void;
};

export default function Step1({ setOpenPickupSidebar }: Step1Props) {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4 text-black">
        Pickup Address
        <span className="block text-sm text-gray-500">Select or add a pickup address</span>
      </h2>

      <div className="mb-6">
        <input type="text" placeholder="Search address..." className="input w-full" />
      </div>

      <h3 className="text-md font-semibold mb-3 text-black">Recently Used Addresses</h3>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {[{ id: 1, primary: true, address: "123, Market Street, City", number: "+91 9876543210" }].map(
          (item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03, y: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-gray-50 border border-gray-300 rounded-2xl p-6 relative cursor-pointer h-60 w-full md:w-[520px]"
            >
              <button
                onClick={() => alert("Edit Address")}
                className="absolute top-3 left-3 text-blue-600 hover:text-blue-500"
              >
                <ArrowLeft className="w-4 h-4 rotate-45" />
              </button>

              {item.primary && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Verified
                </span>
              )}

              {item.primary && <p className="text-sm font-semibold text-green-600 mb-2">Primary</p>}

              <p className="text-black font-medium mb-1">{item.address}</p>
              <p className="text-gray-600 text-sm mb-3">{item.number}</p>
              <hr className="border-gray-300 my-3" />
              <p className="text-xs text-gray-500">Last used • Ready for pickup</p>
            </motion.div>
          )
        )}
      </div>

      <h3 className="text-md font-semibold mb-3 text-black">Other Addresses</h3>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {[{ id: 3, address: "789, Lake Road, City", number: "+91 9988776655" }].map(
          (item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03, y: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-gray-50 border border-gray-300 rounded-2xl p-6 relative cursor-pointer h-60 w-full md:w-[520px]"
            >
              <button
                onClick={() => alert("Edit Address")}
                className="absolute top-3 left-3 text-blue-600 hover:text-blue-500"
              >
                <ArrowLeft className="w-4 h-4 rotate-45" />
              </button>

              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <ArrowLeft className="w-4 h-4 rotate-45" /> Location
              </span>

              <p className="text-black font-medium mb-1">{item.address}</p>
              <p className="text-gray-600 text-sm mb-3">{item.number}</p>
              <hr className="border-gray-300 my-3" />
              <p className="text-xs text-gray-500">Secondary pickup address</p>
            </motion.div>
          )
        )}
      </div>

      <motion.div
        whileHover={{ scale: 1.03, y: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
        onClick={() => setOpenPickupSidebar(true)}
        className="mt-6 bg-gray-100 border border-dashed border-gray-300 rounded-2xl p-6 cursor-pointer h-60 w-full md:w-[520px] flex items-center justify-center text-black font-semibold text-lg hover:bg-gray-200 transition"
      >
        + Add New Pickup Address
      </motion.div>
    </div>
  );
}
