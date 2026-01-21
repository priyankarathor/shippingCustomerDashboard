"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import OrderHeader from "../OrderHeader";

export default function BulkOrderPage() {
  const router = useRouter();

  // ✅ FIX: define activeNav state
  const [activeNav, setActiveNav] = useState("orders");

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 px-8 py-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header Navigation */}
      {/* <OrderHeader
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        title="Add Order"
      /> */}

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Bulk Order Upload</h1>
        <button
          onClick={() => router.back()}
          className="text-sm underline text-gray-600 hover:text-black"
        >
          Back
        </button>
      </div>

      {/* Bulk Upload Card */}
      <div className="bg-white border rounded-2xl p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Import Bulk Orders</h2>
          <p className="text-sm text-gray-500">
            Download the sample file and replace its data with your order details.
          </p>
        </div>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-indigo-400 rounded-xl p-12 text-center bg-indigo-50">
          <UploadCloud className="mx-auto h-10 w-10 text-indigo-500 mb-3" />

          <p className="text-sm text-gray-600 mb-2">
            Drag and Drop to upload files
          </p>
          <p className="text-xs text-gray-400 mb-4">OR</p>

          <input
            type="file"
            accept=".csv,.xls,.xlsx"
            onChange={handleFileUpload}
            className="hidden"
            id="bulk-upload"
          />

          <label
            htmlFor="bulk-upload"
            className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm cursor-pointer hover:bg-indigo-700 transition"
          >
            Browse and Upload
          </label>

          {uploadedFile && (
            <p className="mt-3 text-green-600 text-sm font-medium">
              ✅ {uploadedFile.name} uploaded
            </p>
          )}

          <p className="text-xs text-gray-400 mt-3">
            Only CSV, XLS, XLSX formats are accepted.
          </p>
        </div>

        {/* Recent Uploads */}
        <div>
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Recent Uploads</h3>
            <span className="text-sm text-gray-400">Last 10 days</span>
          </div>

          <div className="border rounded-lg p-6 text-center text-sm text-gray-400">
            No Data Found
          </div>
        </div>
      </div>
    </motion.div>
  );
}
