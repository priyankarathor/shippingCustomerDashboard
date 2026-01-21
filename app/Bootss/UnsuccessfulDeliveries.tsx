"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Upload, Filter, CalendarDays } from "lucide-react";

const reasonsList = [
  "Customer Not Available",
  "Incorrect Address",
  "Phone Not Reachable",
  "Reschedule Requested",
  "Address Closed",
];

export default function UnsuccessfulDeliveries() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);

  const toggleReason = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F7FB] p-6">
      {/* Header Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Last 30 Days */}
        <Dropdown
          label={
            <span className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Last 30 days
            </span>
          }
          open={openDropdown === "days"}
          onOpen={() => setOpenDropdown("days")}
          onClose={() => setOpenDropdown(null)}
        >
          {["Today", "Last 7 days", "Last 30 days", "Custom Range"].map((d) => (
            <div
              key={d}
              className="px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer"
            >
              {d}
            </div>
          ))}
        </Dropdown>

        {/* Select Reasons */}
        <Dropdown
          label={`Select Reasons ${selectedReasons.length ? `(${selectedReasons.length})` : ""}`}
          open={openDropdown === "reasons"}
          onOpen={() => setOpenDropdown("reasons")}
          onClose={() => setOpenDropdown(null)}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium">Reasons</span>
            <X
              className="w-4 h-4 cursor-pointer"
              onClick={() => setOpenDropdown(null)}
            />
          </div>

          <div className="space-y-2 max-h-40 overflow-auto">
            {reasonsList.map((r) => (
              <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedReasons.includes(r)}
                  onChange={() => toggleReason(r)}
                />
                {r}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-4 border-t pt-3">
            <button
              onClick={() => setSelectedReasons([])}
              className="text-sm text-gray-500"
            >
              Clear
            </button>
            <button
              onClick={() => setOpenDropdown(null)}
              className="bg-black text-white px-4 py-1.5 rounded text-sm"
            >
              Apply
            </button>
          </div>
        </Dropdown>

        {/* Simple Dropdowns */}
        <SimpleDropdown label="Select Input Required" options={["Yes", "No"]} />
        <SimpleDropdown label="Select Critical Action" options={["Yes", "No"]} />

        {/* More Filters */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border hover:shadow"
        >
          <Filter className="w-4 h-4" /> More Filters
        </button>

        {/* Upload */}
        <button
          onClick={() => setUploadModal(true)}
          className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm border hover:shadow"
        >
          <Upload className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <div className="grid grid-cols-7 text-sm font-medium text-gray-600 border-b bg-gray-50 px-4 py-3 min-w-[900px]">
          <div>Delivery Attempt</div>
          <div>Order Details</div>
          <div>Customer</div>
          <div>Delivery Address</div>
          <div>Shipment</div>
          <div>Last Action By</div>
          <div>Action</div>
        </div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-gray-500"
        >
          <div className="text-lg font-medium mb-1">No Orders Found</div>
          <div className="text-sm">Try adjusting your filters</div>
        </motion.div>
      </div>

      {/* Sidebar Filters */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed top-0 right-0 h-full w-[380px] max-w-[90%] bg-white shadow-2xl p-6 z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold">Filters</h3>
              <X
                className="cursor-pointer"
                onClick={() => setSidebarOpen(false)}
              />
            </div>

            {["Days Since Last Attempt", "Updated Delivery Instructions", "Couriers", "Ticket Created", "Attempts"].map((label) => (
              <div key={label} className="mb-4">
                <label className="text-sm font-medium">{label}</label>
                <select className="w-full border rounded-lg px-3 py-2 mt-1 text-sm">
                  <option>Select {label}</option>
                </select>
              </div>
            ))}

            <div className="mb-6">
              <label className="text-sm font-medium">SKU</label>
              <input
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                placeholder="Enter SKU"
              />
            </div>

            <div className="flex justify-between border-t pt-4">
              <button className="text-sm text-gray-500">Clear</button>
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl w-[440px] p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Upload Bulk NDR</h3>
                <X
                  className="cursor-pointer"
                  onClick={() => setUploadModal(false)}
                />
              </div>

              <div className="border-dashed border-2 rounded-xl p-10 text-center text-sm text-gray-500">
                Drag & drop file here or click to upload
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                  Upload
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------- Dropdown Component ----------------
function Dropdown({ label, open, onOpen, onClose, children }) {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={open ? onClose : onOpen}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border hover:shadow"
      >
        {label} <ChevronDown className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute mt-2 w-64 bg-white border rounded-xl shadow-xl p-4 z-50"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------- SimpleDropdown Component ----------------
function SimpleDropdown({ label, options }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border hover:shadow"
      >
        {value || label} <ChevronDown className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute mt-2 w-40 bg-white border rounded-xl shadow-xl z-50"
          >
            {options.map((o) => (
              <div
                key={o}
                onClick={() => {
                  setValue(o);
                  setOpen(false);
                }}
                className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                  value === o ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {o}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
