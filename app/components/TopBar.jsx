"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Mic,
  Plus,
  RefreshCw,
  HelpCircle,
  Zap,
  ChevronDown,
  PackagePlus,
  Bike,
  Calculator,
  LifeBuoy,
  MapPin,
  User,
  FileText,
  Gift,
  ThumbsUp,
  ScrollText,
  Keyboard,
  LogOut,
} from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import AllProductsModal from "./AllProductsModal";

export default function TopBar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);

  // Ctrl + K & ESC shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenSearch(true);
      }

      if (e.key === "Escape") {
        setOpenSearch(false);
        setOpenProfile(false);
        setOpenProducts(false); // closes ALL PRODUCTS modal
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Close profile popup on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-16 right-0 h-14 bg-white border-b z-40 px-4 ">
        <div className="h-full flex items-center justify-between gap-6">
          {/* ================= LEFT : SEARCH ================= */}
          <div className="flex items-center gap-4">
            <div
              ref={searchRef}
              onClick={() => setOpenSearch(true)}
              className="flex items-center w-[420px] bg-gray-100 rounded-full px-4 py-1.5 gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-400 flex-1">
                Search via 'AWB'
              </span>
              <span className="text-[10px] text-gray-500 border px-2 py-0.5 rounded-md whitespace-nowrap">
                Ctrl + K
              </span>
              <Mic className="w-4 h-4 text-blue-950" />
            </div>

            {/* ================= BUSINESS SCORE ================= */}
            <div className="relative group hidden md:flex items-center gap-2 text-xs cursor-pointer">
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 rotate-[-90deg]">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#2563eb"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="88"
                    strokeDashoffset="88"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">
                  0/6
                </span>
              </div>

              <span className="font-medium text-blue-950 whitespace-nowrap">
                Business Success Score
              </span>

              {/* 🔹 Hover Box */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 hidden group-hover:block z-50">
                <div className="bg-blue-950 text-white text-xs rounded-lg px-4 py-3 w-64 shadow-lg">
                  Start protecting your business by activating services that
                  secure revenue, engage buyers, and improve cash flow.
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT : ACTIONS ================= */}
          <div className="flex items-center gap-4">
            {/* ================= WALLET ================= */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full cursor-pointer">
                <span className="text-xs font-medium">₹0</span>
                <button className="bg-blue-950 text-white p-1 rounded-full">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* 🔹 Hover Box */}
              <div className="absolute top-10 right-0 hidden group-hover:block z-50">
                <div className="bg-white border shadow-lg rounded-lg px-4 py-2 text-xs whitespace-nowrap">
                  Usable Amount: <span className="font-semibold">₹0</span>
                </div>
              </div>
            </div>

            <button className="p-2 rounded-full hover:bg-gray-100">
              <RefreshCw className="w-4 h-4" />
            </button>

            <button className="flex items-center gap-1 text-blue-950 text-xs font-medium">
              <HelpCircle className="w-4 h-4" />
              Need Help
            </button>

            {/* ================= ZAP ACTIONS ================= */}
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-gray-100 text-blue-950">
                <Zap className="w-4 h-4" />
              </button>

              {/* Hover Panel */}
              <div className="absolute top-12 right-0 hidden group-hover:block z-50">
                <div className="bg-white rounded-xl shadow-xl border p-6 w-[760px]">
                  <div className="grid grid-cols-5 gap-4 text-center text-xs">
                    {/* Add Order */}
                    <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 cursor-pointer">
                      <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <PackagePlus className="w-5 h-5 text-blue-950" />
                      </div>
                      Add an Order
                    </div>

                    {/* Hyperlocal */}
                    <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 cursor-pointer">
                      <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Bike className="w-5 h-5 text-purple-600" />
                      </div>
                      Create a Hyperlocal Shipment
                    </div>

                    {/* Rate Calculator */}
                    <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 cursor-pointer">
                      <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-indigo-950" />
                      </div>
                      Rate Calculator
                    </div>

                    {/* Ticket */}
                    <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 cursor-pointer">
                      <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
                        <LifeBuoy className="w-5 h-5 text-sky-600" />
                      </div>
                      Create a Ticket
                    </div>

                    {/* Track */}
                    <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 cursor-pointer">
                      <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                      </div>
                      Track Shipments
                    </div>
                  </div>

                  <p className="mt-4 text-center text-xs text-blue-0 cursor-pointer">
                    Close Action Descriptions
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}
            <button
              onClick={() => setOpenProducts(true)}
              className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-xs font-medium"
            >
              ALL PRODUCTS
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Avatar & Profile Popup */}
            <div ref={profileRef} className="relative">
              <div
                onClick={() => setOpenProfile((prev) => !prev)}
                className="h-8 w-8 rounded-full bg-blue-950 text-white flex items-center justify-center text-sm font-semibold cursor-pointer select-none"
              >
                A
              </div>

              {openProfile && (
                <div className="absolute right-0 top-12 w-56 bg-white border rounded-xl shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <User className="w-4 h-4" />
                      Seller
                    </li>

                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <FileText className="w-4 h-4" />
                      Current Plan
                    </li>

                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Gift className="w-4 h-4" />
                      Refer & Earn
                    </li>

                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <ThumbsUp className="w-4 h-4" />
                      Rate Us
                    </li>

                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <ScrollText className="w-4 h-4" />
                      Terms & Conditions
                    </li>

                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Keyboard className="w-4 h-4" />
                      Keyboard Shortcuts
                    </li>

                    <li className="border-t mt-2">
                      <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      <SearchOverlay
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        anchorRef={searchRef}
      />
      <AllProductsModal
        open={openProducts}
        onClose={() => setOpenProducts(false)}
      />
    </>
  );
}
