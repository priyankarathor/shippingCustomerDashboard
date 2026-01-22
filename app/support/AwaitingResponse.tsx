"use client";

import { Calendar, ChevronDown } from "lucide-react";

export default function AwaitingResponse() {
  return (
    <div className="space-y-6">
      {/* ================= FILTER BAR ================= */}
      <div className="flex items-center gap-4">
        <Filter label="Last 30 days" icon={<Calendar size={16} />} />
        <Filter label="Choose Subcategory" />
        <div className="flex-1" />
        <Filter label="Sort By: Most Recently Created" />
      </div>

      {/* ================= TABLE + EMPTY STATE ================= */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-sm font-medium text-gray-700">
              <th className="p-5 text-left">Ticket ID</th>
              <th className="p-5 text-left">AWB(s)</th>
              <th className="p-5 text-left">Subcategory</th>
              <th className="p-5 text-left">Ticket Status</th>
              <th className="p-5 text-left">Resolution Due By</th>
              <th className="p-5 text-left">Last Updated</th>
              <th className="p-5 text-left">Action</th>
            </tr>
          </thead>
        </table>

        {/* Empty State */}
        <div className="h-[420px] flex flex-col items-center justify-center text-center">
          <img src="/support-empty.svg" alt="No Data" className="h-52 mb-6" />

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

/* ================= FILTER BUTTON ================= */

function Filter({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <button className="flex items-center gap-3 px-4 py-2 bg-white border rounded-lg text-sm text-gray-700 shadow-sm">
      {icon}
      {label}
      <ChevronDown size={16} className="ml-auto text-gray-500" />
    </button>
  );
}
