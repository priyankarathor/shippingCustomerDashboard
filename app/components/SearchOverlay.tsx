"use client";

import { useEffect, useState } from "react";
import { Search, Mic } from "lucide-react";

const filters = [
  "All",
  "Buyer Mobile No.",
  "Buyer Email",
  "Order Id",
  "AWB",
  "SKU",
  "PID",
];

export default function SearchOverlay({ open, onClose, anchorRef }) {
  const [style, setStyle] = useState(null);

  useEffect(() => {
    if (open && anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setStyle({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open, anchorRef]);

  if (!open || !style) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* SEARCH PANEL */}
      <div
        style={style}
        className="absolute bg-white rounded-xl shadow-2xl border"
      >
        {/* INPUT */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Search className="w-4 h-4 text-gray-500" />

          <input
            autoFocus
            placeholder="Type and press enter to search"
            className="flex-1 outline-none text-sm"
          />

          <span className="text-xs text-gray-400 border px-2 py-0.5 rounded-md whitespace-nowrap">
            Ctrl + K
          </span>

          <Mic className="w-4 h-4 text-blue-600" />

          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>

        {/* FILTERS */}
        <div className="p-4">
          <p className="text-xs text-gray-400 mb-2">Search By</p>
          <div className="flex flex-wrap gap-2">
            {filters.map((item, i) => (
              <span
                key={item}
                className={`px-3 py-1 rounded-md text-xs cursor-pointer ${
                  i === 0
                    ? "bg-blue-50 text-blue-600 border border-blue-500"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* EMPTY */}
        <div className="py-16 flex flex-col items-center text-center px-6">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-purple-500" />
          </div>

          <p className="text-sm text-gray-600 max-w-sm">
            Search anything – whether it’s an Order ID, AWB, Buyer details, or
            navigate directly to any page.
          </p>
        </div>

        {/* FOOTER */}
        <div className="border-t p-3 text-xs text-gray-500 text-center">
          Not the result you expected?{" "}
          <span className="text-blue-600 cursor-pointer">Give Feedback</span>
        </div>
      </div>
    </div>
  );
}
