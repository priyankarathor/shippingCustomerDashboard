"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, Filter } from "lucide-react";

const filters = ["Domestic", "International"];
const sortOptions = ["Oldest", "Newest", "Highest Weight"];

export default function DiscrepanciesDashboard() {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          "New Discrepancies",
          "Discrepancies Auto Accepted",
          "All Discrepancies",
          "Product Level Weight Intelligence",
        ].map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 -mb-px text-sm font-medium ${
              i === 0
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500"
            }`}
          >
            {tab}
            {tab.includes("New") && <span className="ml-1 text-green-500 text-xs">New</span>}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <select
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {filters.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>

        <select
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          {sortOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-gray-100"
        >
          <Filter size={16} /> More Filters
        </button>

        <button className="ml-auto flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-gray-100">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-8 gap-4 text-gray-500 font-medium border-b border-gray-200 pb-2">
        {[
          "Discrepancy Details",
          "Product Details",
          "Applied Weight",
          "Courier Weight",
          "Charged Weight",
          "Excess Weight & Charge",
          "Status",
          "Action",
        ].map((col) => (
          <div key={col}>{col}</div>
        ))}
      </div>

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-20 text-gray-400"
      >
        <img
          src="/empty-state-illustration.png"
          alt="Empty"
          className="w-48 h-48 mb-6"
        />
        <p className="text-center text-gray-500">
          We could not find any data for the applied filters. <br />
          Please change filters and retry.
        </p>
      </motion.div>

      {/* More Filters Sidebar */}
      {showMoreFilters && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 border-l border-gray-200 z-50"
        >
          <h2 className="font-semibold mb-4">More Filters</h2>
          <div className="flex flex-col gap-4">
            <select className="border px-3 py-2 rounded-md">
              <option>Days Since Last Attempt</option>
            </select>
            <select className="border px-3 py-2 rounded-md">
              <option>Updated Delivery Instructions</option>
            </select>
            <select className="border px-3 py-2 rounded-md">
              <option>Couriers</option>
            </select>
          </div>
        </motion.div>
      )}
    </div>
  );
}
