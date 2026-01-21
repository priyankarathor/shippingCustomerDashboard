"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaFilter } from "react-icons/fa";
import { UploadCloud, Download, CalendarDays } from "lucide-react";

/* ------------------ Dummy Data ------------------ */
const ordersData = [
  {
    orderId: "ORD001",
    customer: "John Doe",
    product: "Smartphone",
    package: "Box",
    payment: "$200",
    pickup: "Warehouse 1",
    status: "New",
  },
];

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
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white dark:bg-slate-900 border-l border-t dark:border-slate-700" />
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

  const [showBulkTip, setShowBulkTip] = useState(false);
  const [showDownloadTip, setShowDownloadTip] = useState(false);

  const [openBulkModal, setOpenBulkModal] = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);

  const toggleStatus = (s: string) => setSelectedStatuses(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s]);
  const removeStatus = (s: string) => setSelectedStatuses(prev => prev.filter(i => i !== s));

  const filteredOrders = ordersData.filter(
    (o) =>
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
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
            className="flex flex-wrap items-center gap-1 px-4 py-2 border rounded-xl bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 max-w-[220px]"
          >
            {selectedStatuses.length > 0 ? selectedStatuses.map(s => (
              <span key={s} className="flex items-center bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-1">
                {s}
                <span
                  onClick={(e) => { e.stopPropagation(); removeStatus(s); }}
                  className="ml-1 text-white font-bold cursor-pointer rounded-full bg-red-500 w-4 h-4 flex items-center justify-center text-[10px]"
                >
                  ×
                </span>
              </span>
            )) : <span className="text-gray-500 text-sm">Status</span>}
          </button>

          <AnimatePresence>
            {statusFilterOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-12 left-0 w-60 bg-white dark:bg-slate-950 border rounded-xl shadow-lg p-4 z-50"
              >
                {["New", "Ready", "Packed", "Shipped"].map(s => (
                  <div key={s} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="checkbox" checked={selectedStatuses.includes(s)} onChange={() => toggleStatus(s)} className="w-4 h-4" />
                    <span>{s}</span>
                  </div>
                ))}
                <div className="flex justify-between mt-2">
                  <button onClick={() => setSelectedStatuses([])} className="px-3 py-1 border rounded text-sm">Clear</button>
                  <div className="flex gap-2">
                    <button onClick={() => setStatusFilterOpen(false)} className="px-3 py-1 border rounded text-sm">Cancel</button>
                    <button onClick={() => setStatusFilterOpen(false)} className="px-3 py-1 bg-black text-white rounded text-sm">Apply</button>
                  </div>
                </div>
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

        {/* Bulk Update */}
        <div
          className="relative"
          onMouseEnter={() => setShowBulkTip(true)}
          onMouseLeave={() => setShowBulkTip(false)}
        >
          <button
            onClick={() => setOpenBulkModal(true)}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border"
          >
            <UploadCloud size={18} />
          </button>

          <HoverCard
            show={showBulkTip}
            title="Bulk Order Update"
            description="Upload CSV to update multiple new orders"
          />
        </div>


        {/* Download */}
        <div
          className="relative"
          onMouseEnter={() => setShowDownloadTip(true)}
          onMouseLeave={() => setShowDownloadTip(false)}
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
            description="Download reports based on applied filters"
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
                "Buyer Details",
                "Product Details",
                "Dimensions",
                "Warehouse Address",
                "Refund Details",
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
                <td colSpan={8} className="py-24 text-center">
                  <img src="/new_zero.webp" className="w-52 mx-auto mb-6" />
                  <h2 className="text-lg font-semibold mb-2">
                    Add your first order to get started
                  </h2>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => router.push("/order-add")}
                      className="px-6 py-2 rounded-xl bg-blue-600 text-white flex items-center gap-2"
                    >
                      <FaPlus /> Add Order
                    </button>
                    <button className="px-6 py-2 rounded-xl border bg-white dark:bg-slate-800">
                      Sync Website Orders
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => (
                <tr key={o.orderId} className="border-t">
                  <td className="p-4">{o.orderId}</td>
                  <td className="p-4">{o.customer}</td>
                  <td className="p-4">{o.product}</td>
                  <td className="p-4">{o.package}</td>
                  <td className="p-4">{o.payment}</td>
                  <td className="p-4">{o.pickup}</td>
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
          <Modal title="Bulk Update New Orders via CSV" onClose={() => setOpenBulkModal(false)}>
            <p className="text-sm text-gray-500 mb-4">
              Download template and upload updated order details.
            </p>
            <button className="text-blue-600 text-sm mb-6">Download Sample CSV File</button>
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

      {/* ---------------- DOWNLOAD MODAL ---------------- */}
      <AnimatePresence>
        {openDownloadModal && (
          <Modal title="Download Report" onClose={() => setOpenDownloadModal(false)}>
            <p className="text-sm text-gray-500">
              Your report will be generated and downloaded.
            </p>
          </Modal>
        )}
      </AnimatePresence>

      {/* ---------------- MORE FILTER SIDEBAR ---------------- */}
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
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setFilterOpen(false)}>✕</button>
              </div>

              {/* Filter Fields */}
              <div className="flex-1 overflow-y-auto space-y-4">
                <div>
                  <label className="text-sm font-medium">Couriers</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800">
                    <option>Select Couriers</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Delivery Delay Remarks</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800">
                    <option>Select Delivery Delay Remarks</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Secured Shipments</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800">
                    <option>Select</option>
                  </select>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 border rounded-lg" onClick={() => { }}>Clear</button>
                <button className="px-4 py-2 bg-black text-white rounded-lg" onClick={() => { }}>Apply</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
