"use client";

import { ArrowLeft, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ManualKYCPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="border-b px-6 py-4 flex items-center gap-3 mt-20">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h1 className="text-lg font-semibold">Manual KYC</h1>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-10">
        {/* LEFT */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Upload Documents</h2>

          {/* PAN */}
          <p className="font-medium mb-3">Document 1 - PAN Card</p>

          <div className="border rounded-lg p-6 text-center border-dashed">
            <p className="font-medium">Upload Image</p>
            <p className="text-sm text-gray-400">Front</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              placeholder="PAN Number *"
              className="border rounded-lg px-4 py-3"
            />
            <input
              placeholder="Name on PAN *"
              className="border rounded-lg px-4 py-3"
            />
          </div>

          {/* DOCUMENT 2 */}
          <p className="font-medium mt-8">Document 2 *</p>

          <select className="w-full border rounded-lg px-4 py-3 mt-3">
            <option>Select Document Type</option>
            <option>Aadhaar</option>
            <option>Voter ID</option>
            <option>Passport</option>
          </select>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-6 text-center border-dashed">
              Upload Image <br /> <span className="text-sm">Front</span>
            </div>
            <div className="border rounded-lg p-6 text-center border-dashed">
              Upload Image <br /> <span className="text-sm">Back</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              placeholder="Document ID *"
              className="border rounded-lg px-4 py-3"
            />
            <input
              placeholder="Name on Document *"
              className="border rounded-lg px-4 py-3"
            />
          </div>

          <button className="mt-8 bg-blue-900 text-white px-10 py-3 rounded-lg">
            Submit
          </button>
        </div>

        {/* RIGHT */}
        <div>
          <div className="border rounded-xl h-[280px] flex flex-col items-center justify-center text-gray-400">
            <Eye size={48} />
            <p className="mt-2">Uploaded documents will preview here</p>
          </div>

          <div className="mt-6 border rounded-xl p-6">
            <h3 className="font-semibold mb-3">Quick Tips</h3>
            <ul className="text-sm text-gray-600 list-disc ml-5 space-y-2">
              <li>Use a clear, high-quality image</li>
              <li>Ensure details are readable</li>
              <li>Avoid glare or shadows</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
