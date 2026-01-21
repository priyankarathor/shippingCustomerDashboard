"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBarcode,
  FaFileInvoice,
  FaCloudUploadAlt,
  FaDownload,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import { CalendarDays } from "lucide-react";

/* ---------------- Dummy Data ---------------- */
const ordersData = [
  {
    orderId: "ORD003",
    customer: "Alice Brown",
    payment: "$400",
    pickup: "Warehouse 1",
    shipping: "Fast Courier",
    status: "Ready",
  },
  {
    orderId: "ORD004",
    customer: "John Doe",
    payment: "$250",
    pickup: "Warehouse 2",
    shipping: "Speedy Courier",
    status: "Pending",
  },
];

const statuses = ["Pending", "Ready", "Packed", "Shipped"];

/* ---------------- Hover Expand Button ---------------- */
function HoverExpandButton({
  icon,
  text,
  onClick,
  primary = false,
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 overflow-hidden
        ${primary
          ? "bg-black text-white hover:bg-gray-900"
          : "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700"}
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm">
        {text}
      </span>
    </button>
  );
}

/* ---------------- Main Component ---------------- */
export default function ReadyToShip({ search }: { search: string }) {
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [scanModal, setScanModal] = useState(false);
  const [ewayModal, setEwayModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [dateDropdown, setDateDropdown] = useState("Last 7 Days");

  const toggleStatus = (s: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(s) ? prev.filter((i) => i !== s) : [...prev, s]
    );
  };

  const removeStatus = (s: string) => {
    setSelectedStatuses((prev) => prev.filter((i) => i !== s));
  };

  const filteredOrders = ordersData.filter(
    (o) =>
      (selectedStatuses.length === 0 || selectedStatuses.includes(o.status)) &&
      (o.orderId.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4 p-4">
      {/* ================= FILTER BAR ================= */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {/* Date Dropdown */}
        <div className="relative">
          <select
            value={dateDropdown}
            onChange={(e) => setDateDropdown(e.target.value)}
            className="appearance-none px-4 py-2 pr-10 rounded-xl bg-white dark:bg-slate-800 border text-sm"
          >
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>All Time</option>
          </select>
          <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => setStatusFilterOpen(!statusFilterOpen)}
            className="flex flex-wrap items-center gap-1 px-4 py-2 border rounded-xl bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 max-w-[220px]"
          >
            {selectedStatuses.length > 0 ? selectedStatuses.map((s) => (
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

          {/* Status Dropdown */}
          <AnimatePresence>
            {statusFilterOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-12 left-0 w-60 bg-white dark:bg-slate-950 border rounded-xl shadow-lg p-4 z-50"
              >
                {statuses.map((s) => (
                  <div key={s} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="checkbox" checked={selectedStatuses.includes(s)} onChange={() => toggleStatus(s)} className="w-4 h-4"/>
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

        {/* Action Buttons */}
        <HoverExpandButton icon={<FaBarcode />} text="Scan / Paste AWBs" onClick={() => setScanModal(true)} />
        <HoverExpandButton icon={<FaFileInvoice />} text="Bulk E-Way Bill" onClick={() => setEwayModal(true)} />
        <HoverExpandButton icon={<FaDownload />} text="Download Report" primary onClick={() => setDownloadModal(true)} />
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-2xl border bg-gray-50 dark:bg-slate-900 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              {["Order", "Customer", "Payment", "Pickup", "Courier", "Status", "Action"].map((h) => (
                <th key={h} className="p-4 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-24 text-center">
                  <div>
                    <img src="/new_zero.webp" alt="No Orders" className="w-52 mx-auto mb-4" />
                    <h2 className="text-lg font-semibold mb-2">Add your first order to get started</h2>
                    <div className="flex gap-4 justify-center">
                      <button className="px-6 py-2 rounded-xl bg-blue-600 text-white flex items-center gap-2">
                        <FaBarcode /> Add Order
                      </button>
                      <button className="px-6 py-2 rounded-xl border dark:border-slate-700 bg-white dark:bg-slate-800">
                        Sync Website Orders
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => (
                <tr key={o.orderId} className="border-t">
                  <td className="p-4">{o.orderId}</td>
                  <td className="p-4">{o.customer}</td>
                  <td className="p-4">{o.payment}</td>
                  <td className="p-4">{o.pickup}</td>
                  <td className="p-4">{o.shipping}</td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">{o.status}</span></td>
                  <td className="p-4"><button className="px-3 py-1 text-xs bg-black text-white rounded">View</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= SCAN MODAL ================= */}
      <Modal open={scanModal} onClose={() => setScanModal(false)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Scan / Paste AWBs To Download Manifest</h2>
          <button onClick={() => setScanModal(false)} className="text-gray-500 hover:text-gray-700"><FaTimes size={20} /></button>
        </div>
        <p className="text-sm text-gray-600 mb-2">Start scanning your orders or paste your selected AWBs here:</p>
        <textarea placeholder="Scan / Paste AWB's" className="w-full h-28 border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <p className="font-semibold mb-2">List of AWBs to download manifest:</p>
        <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 mb-4 border rounded-lg p-2">
          <span>AWB No.</span>
          <span>Order ID</span>
          <span>Courier</span>
          <span>Pickup Address</span>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setScanModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Download Manifest</button>
        </div>
      </Modal>

      {/* ================= BULK EWAY MODAL ================= */}
      <Modal open={ewayModal} onClose={() => setEwayModal(false)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Bulk E-Way Bill Upload</h2>
          <button onClick={() => setEwayModal(false)} className="text-gray-500 hover:text-gray-700"><FaTimes size={20} /></button>
        </div>
        <p className="mb-3 text-sm text-red-500">
          E-Way Bill is Mandatory for Shipment above ₹50,000 as per Govt. Norms
        </p>
        <p className="font-semibold mb-2">Order List</p>
        <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 mb-4 border rounded-lg p-2">
          <span>Orders on which E-Way Bill is required</span>
          <span>Download List</span>
          <span>Alert</span>
          <span>Download Sample CSV File</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">Please download below template to update E-Way Bill Details.</p>
        <button className="px-4 py-2 bg-gray-100 border rounded-lg mb-4">Download Sample CSV File</button>
        <div className="border-2 border-dashed rounded-xl p-6 text-center mb-4">
          <FaCloudUploadAlt className="mx-auto text-4xl mb-2 text-gray-400"/>
          <p>Drag & Drop to Upload File</p>
          <p className="text-xs text-gray-400 mb-2">OR</p>
          <button className="underline text-sm">Browse File</button>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setEwayModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">Upload File</button>
        </div>
      </Modal>
    </div>
  );
}

/* ================= REUSABLE MODAL COMPONENT ================= */
function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-950 rounded-2xl p-6 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
