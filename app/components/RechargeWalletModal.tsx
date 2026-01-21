"use client";

import { X, Wallet } from "lucide-react";
import { useState } from "react";

export default function RechargeWalletModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState(200);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal */}
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recharge Your Wallet</h2>
        </div>

        {/* Amount */}
        <p className="text-sm text-center text-gray-500 mb-2">
          Enter Amount to Add
        </p>

        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl font-bold">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-28 text-3xl font-bold text-center border-b-2 border-dashed outline-none"
          />
        </div>

        {/* Quick Amounts */}
        <div className="flex justify-center gap-3 mb-6">
          {[500, 1000, 1500, 2000].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(v)}
              className="px-4 py-1 rounded-full border text-sm hover:bg-gray-100"
            >
              ₹{v}
            </button>
          ))}
        </div>

        {/* Offer */}
        <div className="rounded-xl bg-green-50 border border-green-200 p-4 mb-4">
          <div className="flex justify-between items-center">
            <p className="text-green-700 font-semibold">
              ✅ Code FLAT50 applied!
            </p>
            <button className="text-red-500 text-sm">Remove</button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            25% Cashback on min recharge of INR200
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Note: Cashback expires in 30 days
          </p>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between text-sm mb-6">
          <span className="text-gray-600">
            Amount to be credited: <strong>₹{amount + 50}</strong>
          </span>
          <button className="text-blue-600 font-medium">
            View Bill Summary
          </button>
        </div>

        {/* CTA */}
        <button className="w-full rounded-lg bg-purple-600 text-white py-3 text-lg font-semibold hover:bg-purple-700">
          Pay ₹{amount}
        </button>
      </div>
    </div>
  );
}
