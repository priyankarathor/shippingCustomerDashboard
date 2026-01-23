"use client";

import { useState } from "react";
import { Calendar, Search, Info } from "lucide-react";
import { Package } from "lucide-react";

export default function RemittanceLogs() {
  const [activeTab, setActiveTab] = useState<"COD" | "FUTURE">("COD");

  return (
    <div className="px-10 pb-10">
      {/* ================= SUB TABS ================= */}
      <div className="flex items-center gap-3 mb-10">
        <button
          onClick={() => setActiveTab("COD")}
          className={`px-5 py-2 rounded-md text-sm font-medium ${
            activeTab === "COD"
              ? "bg-blue-600 text-white"
              : "border text-gray-700"
          }`}
        >
          COD Reconciliation
        </button>

        <button
          onClick={() => setActiveTab("FUTURE")}
          className={`px-5 py-2 rounded-md text-sm font-medium ${
            activeTab === "FUTURE"
              ? "bg-blue-600 text-white"
              : "border text-gray-700"
          }`}
        >
          Future COD
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      {activeTab === "COD" ? <CODReconciliation /> : <FutureCOD />}
    </div>
  );
}

/* ========================================================= */
/* ================= COD RECONCILIATION ==================== */
/* ========================================================= */

function CODReconciliation() {
  return (
    <>
      {/* ---------- FILTER BAR ---------- */}
      <div className="flex items-center gap-3 mb-10">
        <DateInput />
        <Select label="Last One Year" />
        <SearchBox />
        <button className="ml-auto px-4 py-2 border rounded-md text-sm flex items-center gap-2">
          COD Reconciliation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-2">
        {[
          "COD To Be Remitted",
          "Last COD Remitted",
          "Total COD Remitted",
          "Total deduction from COD",
          "Remittance Initiated",
          "Pending RTO Adjustment",
        ].map((title) => (
          <div
            key={title}
            className="bg-blue-600 text-white rounded-md px-4 py-2 text-center"
          >
            <div className="flex items-center justify-center gap-1 text-xs mb-1">
              {title}
              <Info size={12} />
            </div>
            <p className="text-base font-semibold">₹ 0.00</p>
          </div>
        ))}
      </div>

      {/* ---------- EMPTY STATE ---------- */}
      <EmptyState
        image="/cod-remittance-empty.svg"
        title="Your remittance is on its way"
        subtitle="Hey Seller, We release COD remittance 3 times in a week and on the 8th day from the date of delivery."
        buttonText="Learn More"
        big
      />
    </>
  );
}

/* ========================================================= */
/* ===================== FUTURE COD ======================== */
/* ========================================================= */

function FutureCOD() {
  return (
    <>
      {/* ---------- TABLE HEADER ---------- */}
      <div className="bg-white border-b px-6 py-4 grid grid-cols-3 text-sm font-medium text-gray-700">
        <span>Expected Date Of Remittance</span>
        <span className="text-center">Total AWBs</span>
        <span className="text-right flex items-center justify-end gap-1">
          Total COD To Be Remitted <Info size={14} />
        </span>
      </div>

      {/* ---------- EMPTY STATE ---------- */}
      <div className="bg-white rounded-b-xl h-[460px] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <Package className="w-36 h-36 text-blue-600" strokeWidth={1.2} />
          </div>
          <h2 className="text-2xl font-semibold text-blue-600">
            We could not find any data.
          </h2>
        </div>
      </div>
    </>
  );
}

/* ========================================================= */
/* =================== REUSABLE UI ========================= */
/* ========================================================= */

function DateInput() {
  return (
    <div className="relative">
      <input
        className="border rounded-md px-4 py-2 text-sm pr-10"
        value="Oct 23, 2025 - Jan 23, 2026"
        readOnly
      />
      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
    </div>
  );
}

function Select({ label }: { label: string }) {
  return (
    <select className="border rounded-md px-4 py-2 text-sm">
      <option>{label}</option>
    </select>
  );
}

function SearchBox() {
  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      <input
        placeholder="Search by AWB No."
        className="px-4 py-2 text-sm outline-none"
      />
      <button className="px-3 border-l">
        <Search size={16} />
      </button>
    </div>
  );
}

function EmptyState({
  image,
  title,
  subtitle,
  buttonText,
  big = false,
}: {
  image: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  big?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl h-[460px] flex items-center justify-center">
      <div className="text-center max-w-xl">
        <div className="mx-auto mb-8 flex items-center justify-center">
          <Package
            className={`text-blue-600 ${big ? "w-40 h-40" : "w-32 h-32"}`}
            strokeWidth={1.2}
          />
        </div>

        <h2 className="text-2xl font-semibold text-blue-600 mb-2">{title}</h2>

        {subtitle && <p className="text-gray-500 mb-6">{subtitle}</p>}

        {buttonText && (
          <button className="px-10 py-3 rounded-full bg-blue-600 text-white font-medium">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
