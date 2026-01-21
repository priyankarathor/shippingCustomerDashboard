"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { ChevronDown, Package, IndianRupee, Truck } from "lucide-react";
import { Boxes } from "../components/ui/background-boxes";

const cards = [
  { title: "Total Orders", value: "1,245" },
  { title: "Revenue", value: "₹ 82,430" },
  { title: "Delivered", value: "980" },
  { title: "In Transit", value: "164" },
  { title: "Pending", value: "101" },
  { title: "Returns", value: "23" },
];

export default function CardsGrid() {
  return (
    <div className="py-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        {/* Dropdown */}
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-700 focus:outline-none">
            <option>Domestic Shipping</option>
            <option>International Shipping</option>
            <option>Hyperlocal Shipping</option>
          </select>

          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      {/*  VISIBLE GAP */}
      <div className="h-8" />
      {/*  TABS  */}
      <div className="mt-6 space-y-8">
        <div className="flex gap-6  border-b border-gray-200 ">
          {[
            "Overview",
            "Orders Insights",
            "Shipments Status",
            "NDR Management",
            "RTO Overview",
            "Delivery Delays",
          ].map((tab) => (
            <button
              key={tab}
              className={cn(
                "pb-3 text-sm font-medium whitespace-nowrap",

                tab === "Overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/*  VISIBLE GAP */}
      <div className="h-8" />
      {/*  CONTENT GRID  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full justify-start items-start mt-6">
        {/*  LEFT COLUMN (SMALL) */}
        <div className="md:col-span-1 flex flex-col gap-6 h-full  ">
          {" "}
          <AnimatedBox
            title="Orders Today"
            value="0"
            icon={<Package className="w-6 h-6 text-white" />}
          />
          <AnimatedBox
            title="Revenue Today"
            value="₹0"
            icon={<IndianRupee className="w-6 h-6 text-white" />}
          />
          <AnimatedBox
            title="Average Shipping Cost"
            value="₹0"
            icon={<Truck className="w-6 h-6 text-white" />}
          />
        </div>

        {/*  RIGHT COLUMN (LARGE)  */}
        <div className="md:col-span-2 flex flex-col gap-6 h-full w-full">
          <WhiteBox title="Shipments Status">
            <StatsGrid
              stats={[
                { label: "All Shipments", value: "5" },
                { label: "Pickup Pending", value: "0" },
                { label: "In-Transit", value: "0" },
                { label: "Delivered", value: "0" },
                { label: "Pending NDR", value: "0" },
                { label: "RTO", value: "0" },
              ]}
            />
          </WhiteBox>

          <WhiteBox title="NDR Management">
            <StatsGrid
              stats={[
                { label: "Total NDR", value: "0" },
                { label: "Seller Reattempt Request", value: "0" },
                { label: "Customer Reattempt Request", value: "0" },
                { label: "NDR Delivered", value: "0" },
              ]}
            />
          </WhiteBox>

          <WhiteBox title="COD Status">
            <StatsGrid
              stats={[
                { label: "Total COD", value: "₹0" },
                { label: "COD Available", value: "₹0" },
                { label: "COD Pending", value: "₹0" },
                { label: "Last COD Settlement", value: "₹0" },
              ]}
            />
          </WhiteBox>
        </div>
      </div>
      {/* ================= DASHBOARD ANALYTICS ================= */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Couriers Split */}
        <WhiteBox title="Couriers Split">
          <EmptyState text="Data not found for the selected filter." />
        </WhiteBox>

        {/* Overall Shipment Status */}
        <WhiteBox title="Overall Shipment Status">
          <EmptyState text="No Shipment in last 30 days" />
        </WhiteBox>
        {/* Delivery Performance */}
        <WhiteBox title="Delivery Performance">
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <div className="w-48 h-48 rounded-full border-2 border-gray-300" />
            <div className="mt-6 flex gap-6 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-400" />
                Ontime Deliveries
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-400" />
                Late Deliveries
              </span>
            </div>
          </div>
        </WhiteBox>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Empty Data Card */}
        <WhiteBox>
          <EmptyState text="Data not found." />
        </WhiteBox>

        {/* Zone Distribution */}
        <WhiteBox>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-semibold">
              Shipments - Zone Distribution
            </h3>
            <span className="text-sm text-gray-500">Last 30 days</span>
          </div>

          {/* Zones */}
          <div className="space-y-4">
            {[
              {
                name: "Zone A",
                // color: "bg-gray-400",
              },
              {
                name: "Zone B",
                // color: "bg-green-500",
              },
              {
                name: "Zone C",
                // color: "bg-red-500",
              },
              {
                name: "Zone D",
                // color: "bg-black",
              },
              {
                name: "Zone E",
                // color: "bg-yellow-400",
              },
            ].map((zone, index) => (
              <div key={zone.name}>
                <div className="flex items-center gap-4 py-2">
                  <span
                    className={`w-4 h-4 rounded-full border-4 border-white ${zone.color}`}
                  />
                  <span className="text-sm text-gray-800">{zone.name}</span>
                </div>

                {/* Divider */}
                {index !== 4 && (
                  <div className="border-b border-gray-200 mt-2" />
                )}
              </div>
            ))}
          </div>
        </WhiteBox>

        {/* Revenue */}
        <WhiteBox>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-semibold">Revenue</h3>
            <span className="text-sm text-gray-500">Last 30 days</span>
          </div>

          {/* Revenue Rows */}
          <div className="space-y-4">
            {[
              { label: "Last 90 Days", value: "₹0" },
              { label: "This Week", value: "₹0" },
              { label: "This Month", value: "₹0" },
              { label: "This Quarter", value: "₹0" },
            ].map((item, index) => (
              <div key={item.label}>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {item.value}
                  </span>
                </div>

                {/* Divider */}
                {index !== 3 && (
                  <div className="border-b border-gray-200 mt-2" />
                )}
              </div>
            ))}
          </div>
        </WhiteBox>
      </div>

      <div className="mt-6">
        <WhiteBox title="Shipment Overview by Courier">
          <EmptyState text="Data not found for the selected filter." />
        </WhiteBox>
      </div>

      {/* <p className="mt-6 text-sm text-gray-500 italic">
        Note: Last updated on 18 Jan, 2026. There might be a slight mismatch in
        the data.
      </p> */}
    </div>
  );
}

function AnimatedBox({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-h-[8rem] relative w-full overflow-hidden bg-slate-900 rounded-lg px-6 flex flex-col justify-center">
      <div className="absolute inset-0 bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />

      <div className="relative z-20 flex items-center gap-3">
        {icon}
        <span className="text-sm text-white">{title}</span>
      </div>

      <div className="relative z-20 text-3xl font-semibold text-white mt-2">
        {value}
      </div>
    </div>
  );
}

function WhiteBox({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-gray-800 font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function StatsGrid({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <div className="mt-4">
      {/*  LARGE SCREEN LAYOUT  */}
      <div className="hidden lg:block">
        {/* NUMBER BOXES */}
        <div className="grid grid-cols-6 gap-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-gray-200 bg-white py-4 text-center shadow-sm"
            >
              <div className="text-xl font-semibold text-gray-900">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* LABELS BELOW */}
        <div className="mt-2 grid grid-cols-6 gap-4">
          {stats.map((item) => (
            <div
              key={item.label + "-label"}
              className="text-center text-xs text-gray-500"
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/*  SMALL & MEDIUM SCREEN LAYOUT */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:hidden">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm"
          >
            <div className="text-xl font-semibold text-gray-900">
              {item.value}
            </div>
            <div className="mt-1 text-xs text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      {/* <img
        src="/empty-state.svg"
        alt="No Data"
        className="w-20 h-20 mb-4 opacity-80"
      /> */}
      <p className="text-blue-500 font-medium">{text}</p>
    </div>
  );
}
