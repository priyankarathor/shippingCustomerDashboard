"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function Invoices() {
  const [showModal, setShowModal] = useState(false);

  // Open popup when invoices tab loads
  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <div className="p-6 relative">
      {/* Invoices Content */}
      <div className="bg-white rounded-2xl border h-[420px] flex flex-col items-center justify-center text-center">
        <div className="text-blue-700 font-semibold text-xl mb-2">
          You have 0 invoices
        </div>

        <p className="text-sm text-gray-500 max-w-md">
          Hey Seller, we generate invoices twice a month to ease your income tax
          filing process. Please check this space in the first week of next
          month.
        </p>

        <button className="mt-6 px-6 py-2 rounded-full bg-blue-900 text-white text-sm">
          Learn More
        </button>
      </div>

      {/* GSTN Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />

          {/* Modal Box */}
          <div className="relative bg-white rounded-2xl shadow-xl w-[420px] p-6 z-10">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="text-yellow-500" size={24} />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-2">
              GSTN is missing or inactive on your account!
            </h2>

            {/* Description */}
            <p className="text-center text-sm text-gray-500 mb-3">
              Your invoice will be created without GSTN
            </p>

            <p className="text-center text-xs text-gray-400 mb-6">
              * By agreeing you declare that you are not required to obtain GSTN
              registration
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Yes, I agree
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  // router.push("/profile/gstn"); // optional
                }}
                className="px-5 py-2 rounded-lg bg-purple-500/10 text-blue-600 text-sm hover:bg-purple-500/20"
              >
                Add GSTN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
