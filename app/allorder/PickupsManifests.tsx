"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBarcode, FaTimes, FaFilter } from "react-icons/fa";
import { CalendarDays } from "lucide-react";

/* ---------------- Dummy Data ---------------- */
const pickupData = [
  { pickupId: "PU001", date: "2026-01-18", shipmentCount: 5, pickupAddress: "Warehouse 1", parentCourier: "Fast Courier", status: "Pending", manifestDetails: "MAN001" },
];

const manifestData = [
  { manifestId: "MAN001", createdDate: "2026-01-17", courier: "Fast Courier", pickupAddress: "Warehouse 1", totalShipments: 5, pendingShipments: 2, status: "Pending" },
];

const statuses = ["Pending", "Ready", "Packed", "Shipped"];

/* ---------------- Hover Expand Button ---------------- */
function HoverExpandButton({ icon, text, onClick, primary = false }: { icon: React.ReactNode; text: string; onClick?: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 overflow-hidden
        ${primary ? "bg-black text-white hover:bg-gray-900" : "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700"}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm">{text}</span>
    </button>
  );
}

/* ---------------- Main Component ---------------- */
export default function ReadyToShip({ search }: { search: string }) {
  const [viewType, setViewType] = useState<"pickup" | "manifest">("pickup");
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [scanModal, setScanModal] = useState(false);
  const [moreFilterOpen, setMoreFilterOpen] = useState(false);
  const [dateDropdown, setDateDropdown] = useState("Last 7 Days");

  const toggleStatus = (s: string) => setSelectedStatuses(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s]);
  const removeStatus = (s: string) => setSelectedStatuses(prev => prev.filter(i => i !== s));

  /* ---------------- Dynamic Headers ---------------- */
  const tableHeaders: Record<string, string[]> = {
    pickup: ["Pickup Id / Pickup Request Date", "Shipment Count", "Pickup Address", "Parent Courier", "Pickup Status", "Manifest Details", "Action"],
    manifest: ["Manifest ID / Created Date", "Courier", "Pickup Address", "Total Shipments", "Pending Shipments", "Manifest Status", "Action"],
  };

  const getFilteredData = () => {
    if (viewType === "pickup") return pickupData;
    if (viewType === "manifest") return manifestData;
    return [];
  };
  const filteredData = getFilteredData();

  return (
    <div className="space-y-4 p-4 relative">

      {/* ================= VIEW TYPE BUTTONS ================= */}
      <div className="flex gap-2">
        <button onClick={() => setViewType("pickup")} className={`px-4 py-2 rounded-xl ${viewType === "pickup" ? "bg-black text-white" : "bg-gray-100 dark:bg-slate-800"}`}>Pickup IDs</button>
        <button onClick={() => setViewType("manifest")} className={`px-4 py-2 rounded-xl ${viewType === "manifest" ? "bg-black text-white" : "bg-gray-100 dark:bg-slate-800"}`}>Manifests</button>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">

        {/* Date Dropdown */}
        <div className="relative">
          <select value={dateDropdown} onChange={e => setDateDropdown(e.target.value)} className="appearance-none px-4 py-2 pr-10 rounded-xl bg-white dark:bg-slate-800 border text-sm">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>All Time</option>
          </select>
          <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <button onClick={() => setStatusFilterOpen(!statusFilterOpen)} className="flex flex-wrap items-center gap-1 px-4 py-2 border rounded-xl bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 max-w-[220px]">
            {selectedStatuses.length > 0 ? selectedStatuses.map(s => (
              <span key={s} className="flex items-center bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-1">
                {s}
                <span onClick={e => { e.stopPropagation(); removeStatus(s); }} className="ml-1 text-white font-bold cursor-pointer rounded-full bg-red-500 w-4 h-4 flex items-center justify-center text-[10px]">×</span>
              </span>
            )) : <span className="text-gray-500 text-sm">Status</span>}
          </button>

          <AnimatePresence>
            {statusFilterOpen && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute top-12 left-0 w-60 bg-white dark:bg-slate-950 border rounded-xl shadow-lg p-4 z-50">
                {statuses.map(s => (
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

        {/* Scan / Paste AWBs Button */}
        <HoverExpandButton icon={<FaBarcode />} text="Scan / Paste AWBs" primary onClick={() => setScanModal(true)} />

        {/* More Filters Button */}
        <button onClick={() => setMoreFilterOpen(true)} className="px-4 py-2 rounded-xl border bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-1">
          <FaFilter /> More Filters
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-2xl border bg-gray-50 dark:bg-slate-900 overflow-x-auto shadow-sm">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-slate-800 sticky top-0">
            <tr>{tableHeaders[viewType].map(h => <th key={h} className="p-4 text-left">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={tableHeaders[viewType].length} className="py-24 text-center">
                  <div>
                    <img src="/new_zero.webp" alt="No Data" className="w-52 mx-auto mb-4" />
                    <h2 className="text-lg font-semibold mb-2">Add your first record to get started</h2>
                    <div className="flex gap-4 justify-center">
                      <button className="px-6 py-2 rounded-xl bg-blue-600 text-white flex items-center gap-2"><FaBarcode /> Add Record</button>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((row: any, i) => (
                <tr key={i} className="border-t hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  {viewType === "pickup" && <>
                    <td className="p-4 font-medium">{row.pickupId} / {row.date}</td>
                    <td className="p-4">{row.shipmentCount}</td>
                    <td className="p-4">{row.pickupAddress}</td>
                    <td className="p-4">{row.parentCourier}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${row.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>{row.status}</span></td>
                    <td className="p-4">{row.manifestDetails}</td>
                    <td className="p-4"><button className="px-3 py-1 text-xs bg-black text-white rounded">View</button></td>
                  </>}
                  {viewType === "manifest" && <>
                    <td className="p-4 font-medium">{row.manifestId} / {row.createdDate}</td>
                    <td className="p-4">{row.courier}</td>
                    <td className="p-4">{row.pickupAddress}</td>
                    <td className="p-4">{row.totalShipments}</td>
                    <td className="p-4">{row.pendingShipments}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${row.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>{row.status}</span></td>
                    <td className="p-4"><button className="px-3 py-1 text-xs bg-black text-white rounded">View</button></td>
                  </>}
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
        <textarea placeholder="Scan / Paste AWB's" className="w-full h-28 border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <div className="flex justify-end gap-2">
          <button onClick={() => setScanModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Download Manifest</button>
        </div>
      </Modal>

      {/* ================= RIGHT SLIDING FILTER PANEL ================= */}
      <AnimatePresence>
        {moreFilterOpen && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={() => setMoreFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 w-[300px] h-full bg-white dark:bg-slate-950 shadow-xl z-50 p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setMoreFilterOpen(false)} className="text-gray-500 hover:text-gray-700"><FaTimes size={20} /></button>
              </div>

              {/* Filter Inputs */}
              <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
                <div>
                  <label className="text-sm font-semibold">Courier</label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>Select Courier</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">Escalation Status</label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>Select Escalation Status</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">AWB</label>
                  <input type="text" placeholder="Enter AWB Number" className="w-full mt-1 p-2 border rounded-lg" />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 border rounded-lg" onClick={() => {}}>Clear</button>
                <button className="px-4 py-2 bg-black text-white rounded-lg" onClick={() => {}}>Apply</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ================= REUSABLE MODAL COMPONENT ================= */
function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-950 rounded-2xl p-6 shadow-xl" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
