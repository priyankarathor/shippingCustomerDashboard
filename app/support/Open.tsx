// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaPlus, FaDownload, FaFilter } from "react-icons/fa";
// import { UploadCloud, Download, CalendarDays } from "lucide-react";

// /* ------------------ Dummy Data ------------------ */
// const ordersData = [
//   {
//     orderId: "ORD001",
//     customer: "John Doe",
//     product: "Smartphone",
//     package: "Box",
//     payment: "$200",
//     pickup: "Warehouse 1",
//     status: "New",
//   },
// ];

// /* ------------------ Tooltip ------------------ */
// function HoverCard({
//   show,
//   title,
//   description,
// }: {
//   show: boolean;
//   title: string;
//   description: string;
// }) {
//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 8 }}
//           className="
//             absolute top-14 left-1/2 -translate-x-1/2
//             bg-white dark:bg-slate-900
//             border dark:border-slate-700
//             shadow-2xl rounded-xl
//             px-4 py-3 w-64 z-50
//           "
//         >
//           <p className="text-sm font-semibold">{title}</p>
//           <p className="text-xs text-gray-500 mt-1">{description}</p>

//           <span
//             className="
//               absolute -top-2 left-1/2 -translate-x-1/2
//               w-4 h-4 rotate-45
//               bg-white dark:bg-slate-900
//               border-l border-t dark:border-slate-700
//             "
//           />
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ------------------ Modal ------------------ */
// function Modal({
//   title,
//   onClose,
//   children,
// }: {
//   title: string;
//   onClose: () => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <motion.div
//         className="fixed inset-0 bg-black/40 z-40"
//         onClick={onClose}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       />

//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="
//           fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
//           bg-white dark:bg-slate-950
//           w-full max-w-xl rounded-2xl p-6 z-50
//         "
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">{title}</h2>
//           <button onClick={onClose}>✕</button>
//         </div>
//         {children}
//       </motion.div>
//     </>
//   );
// }

// /* ------------------ Main Component ------------------ */
// export default function Open({ search }: { search: string }) {
//   const router = useRouter();

//   const [days, setDays] = useState("Last 7 Days");
//   const [filterOpen, setFilterOpen] = useState(false);

//   const [showBulkTip, setShowBulkTip] = useState(false);
//   const [showDownloadTip, setShowDownloadTip] = useState(false);

//   const [openBulkModal, setOpenBulkModal] = useState(false);
//   const [openDownloadModal, setOpenDownloadModal] = useState(false);

//   const filteredOrders = ordersData.filter(
//     (o) =>
//       o.orderId.toLowerCase().includes(search.toLowerCase()) ||
//       o.customer.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="space-y-6">
//       {/* ---------------- FILTER BAR ---------------- */}
//       <div className="flex items-center gap-4 bg-gray-100 dark:bg-slate-900 p-4 rounded-2xl border">
//         {/* Days Dropdown */}
//         <div className="relative">
//           <select
//             value={days}
//             onChange={(e) => setDays(e.target.value)}
//             className="
//               px-4 py-2 rounded-xl bg-white dark:bg-slate-800
//               border appearance-none pr-10
//             "
//           >
//             <option>Last 24 Hours</option>
//             <option>Last 7 Days</option>
//             <option>Last 30 Days</option>
//             <option>All Time</option>
//           </select>
//           <CalendarDays className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
//         </div>

//         {/* More Filters */}
//         <button
//           onClick={() => setFilterOpen(true)}
//           className="
//             px-4 py-2 rounded-xl bg-white dark:bg-slate-800
//             flex items-center gap-2 border
//           "
//         >
//           <FaFilter /> More Filters
//         </button>

//         <div className="flex-1" />

//         {/* Bulk Update */}
//         <div
//           className="relative"
//           onMouseEnter={() => setShowBulkTip(true)}
//           onMouseLeave={() => setShowBulkTip(false)}
//         >
//           <button
//             onClick={() => setOpenBulkModal(true)}
//             className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border"
//           >
//             <UploadCloud size={18} />
//           </button>

//           <HoverCard
//             show={showBulkTip}
//             title="Bulk Order Update"
//             description="Upload CSV to update multiple new orders"
//           />
//         </div>

//         {/* Download */}
//         <div
//           className="relative"
//           onMouseEnter={() => setShowDownloadTip(true)}
//           onMouseLeave={() => setShowDownloadTip(false)}
//         >
//           <button
//             onClick={() => setOpenDownloadModal(true)}
//             className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border"
//           >
//             <Download size={18} />
//           </button>

//           <HoverCard
//             show={showDownloadTip}
//             title="Download Report"
//             description="Download reports based on applied filters"
//           />
//         </div>
//       </div>

//       {/* ---------------- TABLE ---------------- */}
//       <div className="overflow-x-auto bg-gray-50 dark:bg-slate-900 rounded-2xl border">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100 dark:bg-slate-800">
//             <tr>
//               {[
//                 "Order Details",
//                 "Customer Details",
//                 "Product Details",
//                 "Package Details",
//                 "Payment",
//                 "Pickup Address",
//                 "Status",
//                 "Action",
//               ].map((h) => (
//                 <th key={h} className="p-4 text-left font-medium">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {filteredOrders.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="py-24 text-center">
//                   <img src="/new_zero.webp" className="w-52 mx-auto mb-6" />
//                   <h2 className="text-lg font-semibold mb-2">
//                     Add your first order to get started
//                   </h2>
//                   <div className="flex gap-4 justify-center">
//                     <button
//                       onClick={() => router.push("/order-add")}
//                       className="px-6 py-2 rounded-xl bg-blue-600 text-white flex items-center gap-2"
//                     >
//                       <FaPlus /> Add Order
//                     </button>
//                     <button className="px-6 py-2 rounded-xl border bg-white dark:bg-slate-800">
//                       Sync Website Orders
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               filteredOrders.map((o) => (
//                 <tr key={o.orderId} className="border-t">
//                   <td className="p-4">{o.orderId}</td>
//                   <td className="p-4">{o.customer}</td>
//                   <td className="p-4">{o.product}</td>
//                   <td className="p-4">{o.package}</td>
//                   <td className="p-4">{o.payment}</td>
//                   <td className="p-4">{o.pickup}</td>
//                   <td className="p-4">
//                     <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
//                       {o.status}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     <button className="px-4 py-1 rounded bg-black text-white text-xs">
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ---------------- BULK MODAL ---------------- */}
//       <AnimatePresence>
//         {openBulkModal && (
//           <Modal
//             title="Bulk Update New Orders via CSV"
//             onClose={() => setOpenBulkModal(false)}
//           >
//             <p className="text-sm text-gray-500 mb-4">
//               Download template and upload updated order details.
//             </p>
//             <button className="text-blue-600 text-sm mb-6">
//               Download Sample CSV File
//             </button>

//             <div className="border-2 border-dashed rounded-xl p-10 text-center">
//               Drag & Drop to Upload File
//               <br />
//               OR
//               <br />
//               <button className="mt-2 text-blue-600">Browse File</button>
//             </div>
//           </Modal>
//         )}
//       </AnimatePresence>

//       {/* ---------------- DOWNLOAD MODAL ---------------- */}
//       <AnimatePresence>
//         {openDownloadModal && (
//           <Modal
//             title="Download Report"
//             onClose={() => setOpenDownloadModal(false)}
//           >
//             <p className="text-sm text-gray-500">
//               Your report will be generated and downloaded.
//             </p>
//           </Modal>
//         )}
//       </AnimatePresence>

//       {/* ---------------- FILTER SIDEBAR ---------------- */}
//       <AnimatePresence>
//         {filterOpen && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/40 z-40"
//               onClick={() => setFilterOpen(false)}
//             />
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               className="
//                 fixed right-0 top-0 h-full w-96
//                 bg-white dark:bg-slate-950
//                 p-6 z-50
//               "
//             >
//               <h2 className="text-lg font-semibold mb-6">More Filters</h2>

//               {[
//                 "Status",
//                 "Channels",
//                 "Payment",
//                 "Delivery Country",
//                 "Order Quantity",
//                 "Order Weight",
//                 "SKU",
//                 "Order Verification Status",
//               ].map((f) => (
//                 <div key={f} className="mb-4">
//                   <label className="text-sm font-medium">{f}</label>
//                   <select className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800">
//                     <option>Select {f}</option>
//                   </select>
//                 </div>
//               ))}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

export default function Open() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* FILTER BAR */}
      <div className="flex gap-4 items-center">
        {/* DATE */}
        <Dropdown
          label="Last 30 days"
          open={openDropdown === "date"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "date" ? null : "date")
          }
        >
          {[
            "Today",
            "Yesterday",
            "Last 7 days",
            "Last 30 days",
            "This Month",
            "Last Month",
            "Custom",
          ].map((d) => (
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
          <input
            placeholder="Search Subcategory"
            className="w-full border rounded-md px-3 py-2 text-sm mb-3"
          />
          {[
            "Delay in Forward Delivery",
            "Delay in RTO Delivery",
            "Delay in Pickup",
            "Shipment Showing as Lost/Damaged",
          ].map((s) => (
            <Checkbox key={s} label={s} />
          ))}
          <FooterButtons />
        </Dropdown>

        {/* STATUS */}
        <Dropdown
          label="Select Status"
          open={openDropdown === "status"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "status" ? null : "status")
          }
        >
          {[
            "Open",
            "Work In Progress",
            "Operational Delay Due to Covid",
            "Partially Resolved",
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

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="grid grid-cols-7 text-sm font-medium p-4 border-b">
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

        {/* EMPTY */}
        <div className="h-[360px] flex flex-col items-center justify-center text-center">
          <img src="/support-empty.svg" className="h-40 mb-6" />
          <p className="font-medium text-gray-600">
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

/* ------------------ REUSABLE ------------------ */

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
      <input type="checkbox" className="rounded" />
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
