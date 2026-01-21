"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ChooseKYCMode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const titleMap: Record<string, string> = {
    individual: "Individual KYC",
    sole: "Sole Proprietorship KYC",
    company: "Company KYC",
    partnership: "Partnership KYC",
  };

  const pageTitle = titleMap[type ?? ""] || "KYC";

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <div className="bg-white border-b px-6 py-4 flex items-center gap-3 mt-20">
        <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
      </div>

      {/* CONTENT */}
      <div className="px-16 py-10">
        <h2 className="text-xl font-semibold mb-6">Choose Your KYC Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {/* INSTANT KYC */}
          <div
            onClick={() => router.push("/kyc/instant")}
            className="relative bg-white rounded-xl border shadow-sm p-8 cursor-pointer hover:border-blue-600 transition"
          >
            <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
              Recommended
            </span>

            <div className="flex flex-col items-center text-center gap-5">
              <ShieldCheck className="w-14 h-14 text-blue-600" />

              <h3 className="text-xl font-semibold">Instant KYC</h3>

              <div className="w-full bg-blue-50 rounded-lg py-3 text-sm font-medium text-blue-800">
                Via Aadhaar & PAN Card
              </div>

              <p className="text-sm text-gray-500">
                Get KYC verified in minutes
              </p>
            </div>
          </div>

          {/* MANUAL KYC */}
          <div
            onClick={() => router.push("/kyc/manual")}
            className="bg-white rounded-xl border shadow-sm p-8 cursor-pointer hover:border-blue-600 transition"
          >
            <div className="flex flex-col items-center text-center gap-5">
              <ShieldCheck className="w-14 h-14 text-blue-600" />

              <h3 className="text-xl font-semibold">Manual KYC</h3>

              <div className="w-full bg-gray-100 rounded-lg py-3 text-sm font-medium text-gray-800">
                Via Document Upload
              </div>

              <p className="text-sm text-gray-500">
                Typically takes 2–3 documents
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
