"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  User,
  Clock,
  ChevronRight,
  Plus,
  Home,
  Building2,
  Warehouse,
  Layers,
} from "lucide-react";

interface AddPickupAddressSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AddPickupAddressSidebar({
  open,
  onClose,
}: AddPickupAddressSidebarProps) {
  const [currentLocation, setCurrentLocation] = useState<"yes" | "no" | null>(
    null
  );
  const [showTiming, setShowTiming] = useState(false);
  const [showRTO, setShowRTO] = useState(false);
  const [showSupplier, setShowSupplier] = useState(false);
  const [tag, setTag] = useState<"Home" | "Work" | "Warehouse" | "Other">(
    "Home"
  );

  const [fullAddress, setFullAddress] = useState("");
  const [landmark, setLandmark] = useState("");

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setFullAddress(data.display_name || "");
          setLandmark(data.address?.suburb || "");
        } catch (err) {
          console.error("Failed to fetch address:", err);
        }
      },
      (err) => {
        console.error(err);
        alert("Unable to fetch your location. Please enter manually.");
      }
    );
  };

  if (!open) return null;

  const infoCards = [
    {
      icon: <MapPin className="text-black" />,
      title: "Address Info",
      desc: "Provide your full address for accurate pickups",
    },
    {
      icon: <User className="text-black" />,
      title: "Contact Info",
      desc: "Provide contact details for the person handling shipment",
    },
    {
      icon: <Clock className="text-black" />,
      title: "Operational Hours",
      desc: "Specify your working hours for pickups",
    },
  ];

  const tagForms = {
    Home: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-300"
      >
        <p className="text-gray-700 mb-2">Home Address Details</p>
        <input
          placeholder="House / Apartment"
          className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-300 focus:border-black transition"
        />
        <input
          placeholder="Street / Area"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black transition"
        />
      </motion.div>
    ),
    Work: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-300"
      >
        <p className="text-gray-700 mb-2">Work Address Details</p>
        <input
          placeholder="Office Name"
          className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-300 focus:border-black transition"
        />
        <input
          placeholder="Street / Area"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black transition"
        />
      </motion.div>
    ),
    Warehouse: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-300"
      >
        <p className="text-gray-700 mb-2">Warehouse Details</p>
        <input
          placeholder="Warehouse Name"
          className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-300 focus:border-black transition"
        />
        <input
          placeholder="Street / Area"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black transition"
        />
      </motion.div>
    ),
    Other: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-300"
      >
        <p className="text-gray-700 mb-2">Other Address Details</p>
        <input
          placeholder="Description"
          className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-300 focus:border-black transition"
        />
        <input
          placeholder="Street / Area"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black transition"
        />
      </motion.div>
    ),
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/20" onClick={onClose} />

        <motion.div
          initial={{ x: 800 }}
          animate={{ x: 0 }}
          exit={{ x: 800 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="relative w-1/2 bg-white text-black h-full p-6 overflow-y-auto shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Add New Pickup Address</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-600 hover:text-black transition" />
            </button>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {infoCards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 border border-gray-300 rounded-xl p-4 cursor-pointer relative shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  {card.icon}
                  <h3 className="font-medium">{card.title}</h3>
                  <p className="text-xs text-gray-500">{card.desc}</p>
                  <ChevronRight className="mt-1 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Inputs */}
          <input
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            placeholder="Full Address"
            className="w-full mb-2 px-4 py-3 rounded-lg border border-gray-300 focus:border-black transition"
          />
          <input
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="Landmark"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black transition"
          />

          {/* Address Tags */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">Select Type</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: "Home", icon: <Home /> },
                { name: "Work", icon: <Building2 /> },
                { name: "Warehouse", icon: <Warehouse /> },
                { name: "Other", icon: <Layers /> },
              ].map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTag(t.name as any)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-xs transition-all ${
                    tag === t.name
                      ? "border-black bg-gray-200 shadow-sm"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {t.icon}
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {tagForms[tag]}

          {/* Location Choice */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">
              Are you at this address right now?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCurrentLocation("yes");
                  handleUseCurrentLocation();
                }}
                className={`flex-1 py-2 rounded-lg border font-medium transition ${
                  currentLocation === "yes"
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                Yes, use my location
              </button>
              <button
                onClick={() => setCurrentLocation("no")}
                className={`flex-1 py-2 rounded-lg border font-medium transition ${
                  currentLocation === "no"
                    ? "border-yellow-500 bg-yellow-100"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                No, I will enter manually
              </button>
            </div>
          </div>

          {/* Operational Timing */}
          <div className="mt-6">
            <button
              onClick={() => setShowTiming(!showTiming)}
              className="flex items-center justify-between w-full text-sm font-medium hover:text-black transition"
            >
              Operational Timings
              <ChevronRight
                className={`transition-transform ${showTiming ? "rotate-90" : ""}`}
              />
            </button>

            {showTiming && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-black transition"
                  placeholder="From"
                />
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-black transition"
                  placeholder="To"
                />
              </div>
            )}
          </div>

          {/* RTO */}
          <div className="mt-6">
            <button
              onClick={() => setShowRTO(!showRTO)}
              className="flex items-center gap-2 text-sm font-medium hover:text-black transition"
            >
              <Plus size={16} /> Add RTO Address
            </button>
            {showRTO && (
              <input
                className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-black transition"
                placeholder="RTO Address"
              />
            )}
          </div>

          {/* Supplier */}
          <div className="mt-4">
            <button
              onClick={() => setShowSupplier(!showSupplier)}
              className="flex items-center gap-2 text-sm font-medium hover:text-black transition"
            >
              <Plus size={16} /> Add Supplier
            </button>
            {showSupplier && (
              <input
                className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-black transition"
                placeholder="Supplier Name"
              />
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button className="flex-1 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition">
              Verify & Save Address
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
