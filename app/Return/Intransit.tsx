"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaFilter } from "react-icons/fa";
import { UploadCloud, Download, CalendarDays } from "lucide-react";
import EmptyState from "./EmptyState";

/* ------------------ Dummy Data ------------------ */
/* Keep empty to show EmptyState */
const ordersData: any[] = [];

/* ------------------ Tooltip ------------------ */
function HoverCard({
  show,
  title,
  description,
}: {
  show: boolean;
  title: string;
  description: string;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="absolute top-14 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 border dark:border-slate-700 shadow-2xl rounded-xl px-4 py-3 w-64 z-50"
        >
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [showDownloadTip, setShowDownloadTip] = useState(false);

  const toggleStatus = (s: string) =>
    setSelectedStatuses((p) =>
      p.includes(s) ? p.filter((i) => i !== s) : [...p, s]
    );

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

        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => setStatusFilterOpen(!statusFilterOpen)}
            className="px-4 py-2 border rounded-xl bg-white dark:bg-slate-800"
          >
            {selectedStatuses.length ? selectedStatuses.join(", ") : "Status"}
          </button>

          <AnimatePresence>
            {statusFilterOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-12 left-0 w-60 bg-white dark:bg-slate-950 border rounded-xl shadow-lg p-4 z-50"
              >
                {["New", "Ready", "Packed", "Shipped"].map((s) => (
                  <div key={s} className="flex gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(s)}
                      onChange={() => toggleStatus(s)}
                    />
                    <span>{s}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1" />

        {/* More Filters */}
        <button
          onClick={() => setFilterOpen(true)}
          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 flex items-center gap-2 border"
        >
          <FaFilter /> More Filters
        </button>

        {/* Download */}
        <div
          onMouseEnter={() => setShowDownloadTip(true)}
          onMouseLeave={() => setShowDownloadTip(false)}
          className="relative"
        >
          <button
            onClick={() => setOpenDownloadModal(true)}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border"
          >
            <Download size={18} />
          </button>
          <HoverCard
            show={showDownloadTip}
            title="Download Report"
            description="Download reports based on filters"
          />
        </div>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <div className="overflow-x-auto bg-gray-50 dark:bg-slate-900 rounded-2xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              {[
                "Return Details",
                "Product Details",
                "Shipping Details",
                "Warehouse Address",
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
                <td colSpan={7}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => (
                <tr key={o.orderId} className="border-t">
                  <td className="p-4">{o.orderId}</td>
                  <td className="p-4">{o.product}</td>
                  <td className="p-4">{o.shipping}</td>
                  <td className="p-4">{o.pickup}</td>
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

      {/* ---------------- DOWNLOAD MODAL ---------------- */}
      <AnimatePresence>
        {openDownloadModal && (
          <Modal
            title="Download Report"
            onClose={() => setOpenDownloadModal(false)}
          >
            <p className="text-sm text-gray-500">
              Your report will be generated and downloaded.
            </p>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
