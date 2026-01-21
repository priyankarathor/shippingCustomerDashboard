import React from "react";
import { Package, TrendingUp, ClipboardList } from "lucide-react";

function Home() {
  return (
    <div className=" min-h-screen p-6 space-y-6  bg-gray-100">
      {/* ===== TOP SMALL BOXES ===== */}
      <div className="flex gap-4 max-w-md ml-6">
        {/* Orders Box */}
        <div className="flex-1 border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-gray-700" />
            <h3 className="text-sm font-semibold text-gray-800">Orders</h3>
          </div>

          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Today</span>
              <span className="font-medium text-gray-800">₹ 0</span>
            </div>
            <div className="flex justify-between">
              <span>Yesterday</span>
              <span className="font-medium text-gray-800">₹ 0</span>
            </div>
          </div>
        </div>

        {/* Revenue Box */}
        <div className="flex-1 border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-gray-700" />
            <h3 className="text-sm font-semibold text-gray-800">Revenue</h3>
          </div>

          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Today</span>
              <span className="font-medium text-gray-800">₹ 0</span>
            </div>
            <div className="flex justify-between">
              <span>Yesterday</span>
              <span className="font-medium text-gray-800">₹ 0</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FULL WIDTH OUTER CARD ===== */}
      <div className="w-full rounded-lg p-6 bg-gray-50 shadow-lg ring-1 ring-gray-100 mt-20">
        <p className="text-xs font-semibold text-gray-500 mb-3 uppercase">
          Action Required Today
        </p>
        {/* INNER SMALL CARD */}
        <div className="max-w-md border rounded-lg p-4 shadow-sm bg-white ">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <ClipboardList className="w-5 h-5 text-gray-700" />

            {/* Content */}
            <div>
              <p className="text-sm text-gray-600">
                New orders to be processed
              </p>
              <p className="text-xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
