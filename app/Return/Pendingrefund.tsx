"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaFilter } from "react-icons/fa";
import { CalendarDays } from "lucide-react";
import EmptyState from "./EmptyState";

/* ------------------ Dummy Data ------------------ */
/* KEEP EMPTY to show empty state */
const ordersData: any[] = [];

/* ------------------ Modal ------------------ */
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-950 w-full max-w-xl rounded-2xl p-6 z-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </motion.div>
    </>
  );
}

/* ------------------ Main Component ------------------ */
export default function NewOrders({ search }: { search: string }) {
  const router = useRouter();

  const [days, setDays] = useState("Last 7 Days");
  const [filterOpen, setFilterOpen] = useState(false);
  const [openBulkModal, setOpenBulkModal] = useState(false);

  const filteredOrders = ordersData.filter(
    (o) =>
      o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ---------------- FILTER BAR ---------------- */}
      <div className="flex items-center gap-4 bg-gray-100 dark:bg-slate-900 p-4 rounded-2xl border flex-wrap">
        {/* Days Dropdown */}
        <div className="relative">
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border appearance-none pr-10"
          >
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>All Time</option>
          </select>
          <CalendarDays className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
        </div>

        <div className="flex-1" />

        {/* More Filters */}
        <button
          onClick={() => setFilterOpen(true)}
          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 flex items-center gap-2 border"
        >
          <FaFilter /> More Filters
        </button>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <div className="overflow-x-auto bg-gray-50 dark:bg-slate-900 rounded-2xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              {[
                "Return Details",
                "Buyer Details",
                "Package Details",
                "Shipping Details",
                "Refund Details",
                "Status",
                "Action",
              ].map((h) => (
                <th key={h} className="p-4 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                {/* 7 columns = colSpan 7 */}
                <td colSpan={7}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => (
                <tr key={o.orderId} className="border-t">
                  <td className="p-4">{o.orderId}</td>
                  <td className="p-4">{o.customer}</td>
                  <td className="p-4">{o.package}</td>
                  <td className="p-4">{o.shipping}</td>
                  <td className="p-4">{o.payment}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="px-4 py-1 rounded bg-black text-white text-xs">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- BULK MODAL ---------------- */}
      <AnimatePresence>
        {openBulkModal && (
          <Modal
            title="Bulk Update New Orders via CSV"
            onClose={() => setOpenBulkModal(false)}
          >
            <p className="text-sm text-gray-500 mb-4">
              Download template and upload updated order details.
            </p>
            <button className="text-blue-600 text-sm mb-6">
              Download Sample CSV File
            </button>
            <div className="border-2 border-dashed rounded-xl p-10 text-center">
              Drag & Drop to Upload File
              <br />
              OR
              <br />
              <button className="mt-2 text-blue-600">Browse File</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* ---------------- FILTER SIDEBAR ---------------- */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-slate-950 p-6 z-50 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setFilterOpen(false)}>✕</button>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-sm font-medium">Couriers</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800">
                    <option>Select Couriers</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Delivery Delay Remarks
                  </label>
                  <select className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800">
                    <option>Select Remarks</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 border rounded-lg">
                  Clear
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-lg">
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
