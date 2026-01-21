"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Store, Building2, Users } from "lucide-react";

export default function KYCStepOne() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [subType, setSubType] = useState<string | null>(null);

  const Card = ({
    id,
    title,
    description,
    requirements,
    image,
    children,
  }: {
    id: string;
    title: string;
    description: string;
    requirements: string;
    image: React.ReactNode;
    children?: React.ReactNode;
  }) => (
    <div
      //   onClick={() => setSelected(id)}
      onClick={() => {
        setSelected(id);
        setSubType(null);

        if (id === "individual" || id === "sole") {
          router.push(`/kyc/choose-mode?type=${id}`);
        }
      }}
      className={`cursor-pointer rounded-xl border p-6 bg-white shadow-sm transition
        ${
          selected === id
            ? "border-blue-600 ring-1 ring-blue-600"
            : "border-gray-200"
        }`}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
          {image}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-sm font-medium text-gray-500">{requirements}</p>
        {children}
      </div>
    </div>
  );

  const SubOption = ({ value, label }: { value: string; label: string }) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSubType(value);

        router.push(`/kyc/choose-mode?type=${selected}`);
      }}
      className={`px-4 py-2 rounded-md border text-sm cursor-pointer transition
      ${
        subType === value
          ? "border-blue-600 bg-blue-50 text-blue-700"
          : "border-gray-200 text-gray-600 hover:bg-gray-50"
      }`}
    >
      {label}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b px-6 py-4 flex items-center gap-3 mt-20">
        <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
        <h1 className="text-lg font-semibold">Complete Your KYC</h1>
      </div>

      {/* CONTENT */}
      <div className="px-8 py-10">
        <h2 className="text-xl font-semibold mb-6">
          Select Your Business Type
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          <Card
            id="individual"
            title="Individual"
            image={<User className="w-10 h-10 text-blue-600" />}
            description="Individuals shipping in their personal capacity without any registered business entity"
            requirements="Requires PAN, Aadhaar, Passbook / Cancelled Cheque"
          />

          <Card
            id="sole"
            title="Sole Proprietorship"
            image={<Store className="w-10 h-10 text-blue-600" />}
            description="Single-owner business registered in the owner’s name and operated independently"
            requirements="Requires PAN, GST, Passbook / Cancelled Cheque"
          />

          <Card
            id="company"
            title="Company"
            image={<Building2 className="w-10 h-10 text-blue-600" />}
            description="Business registered as a Private Limited or Public Limited company under the Companies Act"
            requirements="Requires PAN, GST, CIN, Bank Proof"
          >
            {selected === "company" && (
              <div className="flex gap-3 mt-3">
                <SubOption value="private_limited" label="Private Limited" />
                <SubOption value="public_limited" label="Public Limited" />
              </div>
            )}
          </Card>

          <Card
            id="partnership"
            title="Partnership"
            image={<Users className="w-10 h-10 text-blue-600" />}
            description="Business jointly owned and operated by two or more partners under a partnership agreement"
            requirements="Requires PAN, GST, Partnership Deed, Bank Proof"
          >
            {selected === "partnership" && (
              <div className="flex gap-3 mt-3">
                <SubOption value="registered_partnership" label="Registered" />
                <SubOption value="llp" label="LLP" />
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
