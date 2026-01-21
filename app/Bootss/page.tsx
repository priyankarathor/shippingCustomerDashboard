"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Download, Calendar, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import UnsuccessfulDeliveries from "./UnsuccessfulDeliveries";
import Delivered from "./Delivered";
import RTO from "./RTO";

/* ---------------- CONSTANTS ---------------- */

const tabs = ["Unsuccessful Deliveries", "Delivered", "RTO"];

const dateOptions = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
];

const valueCards = [
    { label: "Extra Revenue Realised", value: "₹0" },
    { label: "RTO Cost Saved", value: "₹0", info: true },
    { label: "Total Value Added", value: "₹0", info: true },
    { label: "Buyer Positive Responses", value: "0", info: true },
    { label: "Shipments Delivered", value: "0", info: true },
];

/* ---------------- PAGE ---------------- */

export default function DeliveryBoostPage() {
    const [activeTab, setActiveTab] = useState("Unsuccessful Deliveries");
    const [selectedRange, setSelectedRange] = useState("Last 30 Days");
    const [openDropdown, setOpenDropdown] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    /* ---- CLOSE DROPDOWN ON OUTSIDE CLICK ---- */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6 mt-10">
            {/* ================= HEADER ================= */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Delivery Boost</h1>

                <div className="flex items-center gap-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            placeholder="Search using Order ID, AWB, Email ID, Phone Number"
                            className="pl-10 pr-4 py-2 w-[380px] rounded-lg border bg-white text-sm"
                        />
                    </div>

                    <button className="p-2 border rounded-lg bg-white hover:bg-gray-50 transition">
                        <Download size={16} />
                    </button>
                </div>
            </div>

            {/* ================= VALUE CREATED SECTION ================= */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl p-6 mb-6 shadow-sm"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-base font-semibold">
                        Value Created With DeliveryBoost
                    </h2>

                    {/* Date Dropdown */}
                    <div ref={dropdownRef} className="relative">
                        <button
                            onClick={() => setOpenDropdown((prev) => !prev)}
                            className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm bg-white hover:bg-gray-50 transition"
                        >
                            <Calendar size={16} />
                            {selectedRange}
                            <ChevronDown size={14} />
                        </button>

                        <AnimatePresence>
                            {openDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg z-20 overflow-hidden"
                                >
                                    {dateOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSelectedRange(option);
                                                setOpenDropdown(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${selectedRange === option
                                                ? "text-indigo-600 font-medium"
                                                : ""
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ================= PREMIUM CARDS ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                    {valueCards.map((card, index) => (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ y: -6 }}
                            className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm hover:shadow-xl transition-all"
                        >
                            {/* Gradient Accent */}
                            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

                            {/* Glow */}
                            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />

                            {/* Label */}
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                {card.label}
                                {card.info && (
                                    <span className="text-gray-400 cursor-pointer hover:text-indigo-500 transition">
                                        ⓘ
                                    </span>
                                )}
                            </div>

                            {/* Value */}
                            <div className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                                {card.value}
                            </div>

                            {/* Subtle Line */}
                            <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-indigo-500/20 to-transparent" />
                        </motion.div>
                    ))}
                </div>

                {/* Charges */}
                <div className="mt-5 text-sm">
                    Delivery Boost Charges:{" "}
                    <span className="text-green-600 font-medium">
                        ₹0 X 5% = ₹0
                    </span>
                    <span className="ml-1 text-gray-400 cursor-pointer">ⓘ</span>
                </div>
            </motion.div>

            {/* ================= TABS ================= */}
            <div className="flex gap-6 border-b mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 text-sm font-medium transition ${activeTab === tab
                            ? "border-b-2 border-indigo-500 text-indigo-600"
                            : "text-gray-500 hover:text-black"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ================= TAB CONTENT ================= */}
            {activeTab === "Unsuccessful Deliveries" && (
                <UnsuccessfulDeliveries />
            )}
            {activeTab === "Delivered" && <Delivered />}
            {activeTab === "RTO" && <RTO />}



            {/* ================= FIXED PAGINATION ================= */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-3 flex justify-between items-center text-sm z-40">
                {/* Items per page */}
                <div className="flex items-center gap-2 px-30 text-gray-600">
                    <span>Items per page:</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border rounded-md px-2 py-1 bg-white text-sm"
                    >
                        <option value={15}>15</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                {/* Pagination controls */}
                <div className="flex items-center gap-6 font-medium">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`transition ${currentPage === 1
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-600 hover:text-indigo-600"
                            }`}
                    >
                        ← PREV
                    </button>

                    <span className="text-gray-500">Page {currentPage}</span>

                    <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="text-gray-600 hover:text-indigo-600 transition"
                    >
                        NEXT →
                    </button>
                </div>
            </div>

        </div>
    );
}
