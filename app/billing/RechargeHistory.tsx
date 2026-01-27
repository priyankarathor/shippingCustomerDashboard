// "use client";

// import { Zap, Calendar, HelpCircle } from "lucide-react";

// export default function RechargeHistory() {
//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4">
//         <Zap className="text-blue-600" size={20} />
//         <h2 className="text-lg font-semibold text-gray-800">
//           Recharge History
//         </h2>
//       </div>

//       {/* Date Filter + Help */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-gray-600">
//           <Calendar size={16} />
//           <span>Oct 24, 2025 - Jan 24, 2026</span>
//         </div>

//         <button className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
//           <HelpCircle size={16} />
//           Need help with Wallet Amount
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl border">
//         {/* Table Header */}
//         <div className="grid grid-cols-5 text-sm font-medium text-gray-700 border-b px-6 py-4">
//           <div>Date</div>
//           <div>Transaction ID (PG)</div>
//           <div>(₹) Amount</div>
//           <div>Status</div>
//           <div>Description</div>
//         </div>

//         {/* Empty State */}
//         <div className="flex flex-col items-center justify-center h-[350px] text-center px-4">
//           <Zap size={64} className="text-blue-500 mb-4" />
//           <p className="text-xl font-semibold text-blue-600 mb-1">
//             We could not find any data for the applied filters.
//           </p>
//           <p className="text-sm text-gray-500">
//             Please change filters and retry.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Zap, Calendar, HelpCircle } from "lucide-react";
import Table from "@/app/components/common/Table";

export default function RechargeHistory() {
  const columns = [
    { key: "date", label: "Date" },
    { key: "txnId", label: "Transaction ID (PG)" },
    { key: "amount", label: "(₹) Amount" },
    { key: "status", label: "Status" },
    { key: "description", label: "Description" },
  ];

  const data: any[] = []; // API response later

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-blue-600" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          Recharge History
        </h2>
      </div>

      {/* Date Filter + Help */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>Oct 24, 2025 - Jan 24, 2026</span>
        </div>

        <button className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
          <HelpCircle size={16} />
          Need help with Wallet Amount
        </button>
      </div>

      {/* Reusable Table */}
      <Table
        columns={columns}
        data={data}
        emptyIcon={<Zap size={64} className="text-blue-500 mb-4" />}
        emptyTitle="We could not find any data for the applied filters."
        emptyDescription="Please change filters and retry."
      />
    </div>
  );
}
