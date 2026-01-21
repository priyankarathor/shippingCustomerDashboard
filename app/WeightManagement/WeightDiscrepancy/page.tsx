"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Video,
  HelpCircle,
  Search,
  Box,
  CheckCircle,
  XCircle,
  AlertCircle,
  ThumbsUp,
  Truck,
} from "lucide-react";

/* ================= TYPES ================= */

interface Card {
  label: string;
  value: number;
  color: string;
  textColor: string;
  icon: ReactNode;
}

/* ================= PAGE ================= */

export default function WeightDiscrepancyPage() {
  const [activeTab, setActiveTab] = useState("New Discrepancies");
  const [prevTab, setPrevTab] = useState(activeTab);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);

  const tabs = [
    "New Discrepancies",
    "Discrepancies Auto Accepted",
    "All Discrepancies",
    "Product Level Weight Intelligence",
  ];

  /* ================= DATA ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards([
        { label: "New Weight Discrepancies", value: 12, color: "bg-yellow-100", textColor: "text-yellow-700", icon: <Box size={20} /> },
        { label: "Discrepancies Accepted", value: 8, color: "bg-sky-100", textColor: "text-sky-700", icon: <CheckCircle size={20} /> },
        { label: "Disputes Accepted by Courier", value: 5, color: "bg-green-100", textColor: "text-green-700", icon: <ThumbsUp size={20} /> },
        { label: "Disputes Rejected by Courier", value: 3, color: "bg-red-100", textColor: "text-red-700", icon: <XCircle size={20} /> },
        { label: "Disputes Pending Resolution", value: 7, color: "bg-orange-100", textColor: "text-orange-700", icon: <AlertCircle size={20} /> },
        { label: "Courier Investigation Pending", value: 4, color: "bg-purple-100", textColor: "text-purple-700", icon: <Truck size={20} /> },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  /* ================= ANIMATED NUMBER ================= */

  const AnimatedNumber = ({ value }: { value: number }) => {
    const motionValue = useMotionValue(0);
    const rounded = useTransform(motionValue, (v) => Math.round(v));

    useEffect(() => {
      const controls = animate(motionValue, value, { duration: 1.2 });
      return controls.stop;
    }, [value]);

    return <motion.span>{rounded}</motion.span>;
  };

  /* ================= TAB DIRECTION ================= */

  const direction =
    tabs.indexOf(activeTab) > tabs.indexOf(prevTab) ? 1 : -1;

  const handleTabChange = (tab: string) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Weight Discrepancy</h1>
          <p className="text-gray-600">
            Take action on pending weight discrepancies
          </p>

          <div className="flex gap-4 mt-3">
            <button className="flex items-center gap-1 text-purple-600 text-sm">
              <Video size={16} /> Watch Video
            </button>
            <button className="flex items-center gap-1 text-purple-600 text-sm">
              <HelpCircle size={16} /> FAQs
            </button>
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            placeholder="Search Order ID, AWB, PID"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* ================= BANNER ================= */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-lg">
          Introducing Product-Level Weight Intelligence{" "}
          <span className="text-xs bg-green-100 text-green-700 px-2 rounded">
            NEW
          </span>
        </h2>
        <p className="text-sm text-gray-700 mt-1">
          Track product-level discrepancies and courier performance.
        </p>

        <button
          onClick={() => setShowMore(!showMore)}
          className="text-sm text-blue-600 mt-2"
        >
          {showMore ? "View Less ▲" : "View More ▼"}
        </button>

        {showMore && (
          <p className="text-sm text-gray-700 mt-3">
            Get actionable insights and automated alerts to reduce disputes.
          </p>
        )}
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
            ))
          : cards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-lg flex justify-between items-center ${card.color}`}
              >
                <div className="flex items-center gap-2">
                  {card.icon}
                  <span className={`font-semibold ${card.textColor}`}>
                    {card.label}
                  </span>
                </div>
                <span className={`text-xl font-bold ${card.textColor}`}>
                  <AnimatedNumber value={card.value} />
                </span>
              </motion.div>
            ))}
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-6 border-b mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-2 relative whitespace-nowrap ${
              activeTab === tab
                ? "border-b-2 border-purple-600 text-purple-600 font-semibold"
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            {tab}
            {tab === "Product Level Weight Intelligence" && (
              <span className="absolute -top-2 right-0 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                New
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ================= TAB CONTENT (SLIDE ANIMATION) ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 40 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 * direction }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {activeTab === "New Discrepancies" && <NewDiscrepancies />}
          {activeTab === "Discrepancies Auto Accepted" && <AutoAccepted />}
          {activeTab === "All Discrepancies" && <AllDiscrepancies />}
          {activeTab === "Product Level Weight Intelligence" && <ProductWeight />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ================= TAB COMPONENTS ================= */

function NewDiscrepancies() {
  return <TabBox title="New Discrepancies Content" />;
}

function AutoAccepted() {
  return <TabBox title="Discrepancies Auto Accepted Content" />;
}

function AllDiscrepancies() {
  return <TabBox title="All Discrepancies Content" />;
}

function ProductWeight() {
  return <TabBox title="Product Level Weight Intelligence Content" />;
}

/* ================= REUSABLE TAB BOX ================= */

function TabBox({ title }: { title: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );
}
