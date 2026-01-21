"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaPlus } from "react-icons/fa";

import NewOrders from "./NewOrders";
import ReadyToShip from "./ReadyToShip";
import PickupsManifests from "./PickupsManifests";
import InTransit from "./InTransit";
import Delivered from "./Delivered";
import RTO from "./RTO";
import AllOrders from "./every";

/* ================= CONFIG ================= */

const sections = [
  "New",
  "Ready to Ship",
  "Pickup & Manifests",
  "In Transit",
  "Delivered",
  "RTO",
  "All",
];

/* ================= PAGE ================= */

export default function OrderDashboard() {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("New");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-slate-950 dark:text-white mt-10">

      {/* ================= TOP HEADER ================= */}
      <div className="flex items-center gap-4 mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border dark:border-slate-800">
        <h2 className="text-lg font-semibold">Orders</h2>

        <select className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800">
          <option>Domestic</option>
          <option>International</option>
        </select>

        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-xl flex-1 max-w-md mx-auto">
          <FaSearch className="text-gray-500" />
          <input
            className="bg-transparent outline-none w-full"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => router.push("/order-add")}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white flex items-center gap-2"
        >
          <FaPlus /> Add Order
        </button>

        <button className="px-5 py-2 rounded-xl bg-green-600 text-white">
          Connect Channel
        </button>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-6 border-b mb-6 dark:border-slate-800">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`relative pb-3 text-sm font-medium transition ${
              activeSection === s
                ? "text-black dark:text-white"
                : "text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            {s}
            {activeSection === s && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-black dark:bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* ================= TAB CONTENT ================= */}
      {activeSection === "New" && <NewOrders search={search} />}
      {activeSection === "Ready to Ship" && <ReadyToShip search={search} />}
      {activeSection === "Pickup & Manifests" && (
        <PickupsManifests search={search} />
      )}
      {activeSection === "In Transit" && <InTransit search={search} />}
      {activeSection === "Delivered" && <Delivered search={search} />}
      {activeSection === "RTO" && <RTO search={search} />}
      {activeSection === "All" && <AllOrders search={search} />}
    </div>
  );
}
