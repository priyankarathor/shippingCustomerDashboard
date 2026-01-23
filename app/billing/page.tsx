"use client";

import { useState } from "react";

import ShippingCharges from "./ShippingCharges";
import RemittanceLogs from "./RemittanceLogs";
import RechargeHistory from "./RechargeHistory";
import OnHoldBalance from "./OnHoldBalance";
import Invoices from "./Invoices";
import CurrentPlan from "./CurrentPlan";
import Passbook from "./Passbook";
import CreditReceipt from "./CreditReceipt";
import DebitNote from "./DebitNote";
// import InternationalBill from "./InternationalBill";

const tabs = [
  "Shipping Charges",
  "COD Remittance",
  "Recharge History",
  "On Hold Balance",
  "Invoices",
  "Current Plan",
  "Passbook",
  "Credit Receipt",
  "Debit Note",
  "International Shipping Bill",
];

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("Shipping Charges");

  return (
    <div className="min-h-screen bg-gray-100 mt-10 ">
      {/* ================= HEADER ================= */}
      <div className="bg-white border-b px-8 py-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Billing</h1>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
            💰 Early COD
          </button>

          <button className="flex items-center justify-center bg-gray-700 text-white px-5 py-2 rounded-lg text-sm">
            ⬇
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="bg-white border-b px-8">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition
                ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-black"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ================= TAB CONTENT ================= */}
      {activeTab === "Shipping Charges" && <ShippingCharges />}
      {activeTab === "COD Remittance" && <RemittanceLogs />}
      {activeTab === "Recharge History" && <RechargeHistory />}
      {activeTab === "On Hold Balance" && <OnHoldBalance />}

      {activeTab === "Invoices" && <Invoices />}
      {activeTab === "Current Plan" && <CurrentPlan />}
      {activeTab === "Passbook" && <Passbook />}

      {activeTab === "Credit Receipt" && <CreditReceipt />}
      {activeTab === "Debit Note" && <DebitNote />}
      {/* {activeTab === "International Shipping Bill" && <InternationalBill />} */}
    </div>
  );
}
