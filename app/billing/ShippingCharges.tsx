"use client";

import { Package } from "lucide-react";

export default function ShippingCharges() {
  return (
    <div className="p-10">
      <div className="bg-white rounded-2xl h-[520px] flex flex-col items-center justify-center">
        <div className="mb-6">
          <Package className="w-28 h-28 text-blue-600" strokeWidth={1.2} />
        </div>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          Add your first order to get started
        </h2>

        <p className="text-gray-500 mb-6">
          Hey Seller, let start your shipping journey with Shiprocket
        </p>

        <div className="flex gap-4">
          <button className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium">
            Add order
          </button>

          <button className="px-8 py-3 rounded-full border border-blue-600 text-blue-600 font-medium">
            Pull Order from Channel
          </button>
        </div>
      </div>
    </div>
  );
}
