"use client";

import { ArrowLeft, Upload, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InstantKYC() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="border-b px-6 py-4 flex items-center gap-3 mt-20">
        <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
        <h1 className="text-lg font-semibold">Instant KYC</h1>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE — FORM */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Verify Aadhaar and PAN</h2>

          {/* Aadhaar */}
          <label className="block font-medium mb-2">
            Aadhaar <span className="text-red-500">*</span>
          </label>

          <button className="bg-blue-900 text-white px-6 py-3 rounded-lg mb-8">
            Verify Aadhaar with Digilocker
          </button>

          {/* PAN Upload */}
          <label className="block font-medium mb-2">
            PAN <span className="text-red-500">*</span>
          </label>

          <div className="border-2 border-dashed rounded-lg p-8 text-center mb-3">
            <Upload className="mx-auto mb-2 text-gray-500" />
            <p className="font-medium">Upload Image</p>
            <p className="text-sm text-gray-500">Front</p>
          </div>

          <p className="text-xs text-gray-400 mb-6">JPG / PNG (Max 2MB)</p>

          {/* PAN NUMBER */}
          <label className="block font-medium mb-2">
            PAN Number <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Enter PAN number"
            className="w-full border rounded-lg px-4 py-3 mb-6"
          />

          {/* CHECKBOXES */}
          <div className="space-y-4 mb-8 text-sm">
            <label className="flex gap-3">
              <input type="checkbox" />
              <span>
                By continuing, you agree to our{" "}
                <span className="text-blue-600 cursor-pointer">
                  Terms & Conditions
                </span>
              </span>
            </label>

            <label className="flex gap-3">
              <input type="checkbox" />
              <span>
                I authorize NimbusPost to verify my PAN card details for
                KYC/compliance purposes.
              </span>
            </label>
          </div>

          {/* SUBMIT */}
          <button className="bg-blue-900 text-white px-10 py-3 rounded-lg">
            Submit Documents
          </button>
        </div>

        {/* RIGHT SIDE — PREVIEW & TIPS */}
        <div className="space-y-6">
          {/* PREVIEW BOX */}
          <div className="border rounded-xl h-72 flex flex-col items-center justify-center text-gray-400">
            <Eye className="w-10 h-10 mb-3 opacity-40" />
            <p>Uploaded documents will preview here</p>
          </div>

          {/* QUICK TIPS */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-semibold mb-3">Quick Tips</h3>
            <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
              <li>Use a clear, high-quality image.</li>
              <li>Make sure all details are visible.</li>
              <li>Avoid glare or blurry photos.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
