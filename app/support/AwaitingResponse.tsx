"use client";

import { useState } from "react";
import { Calendar, ChevronDown, Package } from "lucide-react";

export default function AwaitingResponse() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* ================= FILTER BAR ================= */}
      <div className="flex items-center gap-4">
        {/* DATE */}
        <Dropdown
          label="Last 30 days"
          open={openDropdown === "date"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "date" ? null : "date")
          }
        >
          {["Today", "Yesterday", "Last 7 days", "Last 30 days"].map((d) => (
            <Option key={d} label={d} />
          ))}
        </Dropdown>

        {/* SUBCATEGORY */}
        <Dropdown
          label="Choose Subcategory"
          open={openDropdown === "sub"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "sub" ? null : "sub")
          }
          width="w-[320px]"
        >
          {[
            "Delay in Forward Delivery",
            "Delay in RTO Delivery",
            "Delay in Pickup",
          ].map((s) => (
            <Checkbox key={s} label={s} />
          ))}
          <FooterButtons />
        </Dropdown>

        <div className="flex-1" />

        {/* SORT */}
        <Dropdown
          label="Sort By: Most Recently Created"
          open={openDropdown === "sort"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "sort" ? null : "sort")
          }
        >
          <Option label="Most Recently Updated" />
          <Option label="Most Recently Created" checked />
        </Dropdown>
      </div>

      {/* ================= TABLE + EMPTY STATE ================= */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 text-sm font-medium p-4 border-b text-gray-700">
          {[
            "Ticket ID",
            "AWB(s)",
            "Subcategory",
            "Ticket Status",
            "Resolution Due By",
            "Last Updated",
            "Action",
          ].map((h) => (
            <div key={h}>{h}</div>
          ))}
        </div>

        <div className="h-[420px] flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <Package className="w-28 h-28 text-blue-600" strokeWidth={1.2} />
          </div>
          <p className="text-gray-700 font-medium">
            We could not find any data for the applied filters.
          </p>
          <p className="text-sm text-gray-500">
            Please change filters and retry.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Dropdown({
  label,
  open,
  onToggle,
  children,
  width = "w-[260px]",
}: any) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 border rounded-lg px-4 py-2 bg-white text-sm"
      >
        <Calendar size={16} />
        {label}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className={`absolute mt-2 bg-white border rounded-xl shadow-lg p-4 z-50 ${width}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function Option({ label, checked }: any) {
  return (
    <div className="flex justify-between py-2 text-sm cursor-pointer">
      {label}
      {checked && <span className="text-purple-600">✓</span>}
    </div>
  );
}

function Checkbox({ label }: any) {
  return (
    <label className="flex gap-3 items-center py-2 text-sm">
      <input type="checkbox" />
      {label}
    </label>
  );
}

function FooterButtons() {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <button className="px-4 py-2 rounded-lg border text-sm">Clear</button>
      <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm">
        Apply
      </button>
    </div>
  );
}
