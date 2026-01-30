"use client";

import { COLORS } from "@/app/styles/colors";

import { useState } from "react";

export default function RateCalculatorPage() {
  const [shipmentType, setShipmentType] = useState<"forward" | "return">(
    "forward",
  );
  const [paymentType, setPaymentType] = useState<"cod" | "prepaid">("prepaid");
  const [activeTab, setActiveTab] = useState<"domestic" | "international">(
    "domestic",
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen mt-10">
      {/* ================= HEADER ================= */}
      <h1 className="text-2xl font-bold mb-6">Shipping Rate Calculator</h1>

      {/* ================= TABS ================= */}
      <div className={`flex gap-8 border-b ${COLORS.BORDER_DEFAULT} mb-8`}>
        <button
          onClick={() => setActiveTab("domestic")}
          className={`pb-3 font-semibold ${
            activeTab === "domestic"
              ? "border-b-2 border-blue-950 text-blue-950"
              : "text-gray-500"
          }`}
        >
          Domestic
        </button>

        <button
          onClick={() => setActiveTab("international")}
          className={`pb-3 font-semibold ${
            activeTab === "international"
              ? "border-b-2 border-blue-950 text-blue-950"
              : "text-gray-500"
          }`}
        >
          International
        </button>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT FORM ================= */}
        <div className="lg:col-span-2 bg-white rounded-xl p-8 space-y-8">
          {/* ================= INTERNATIONAL ================= */}
          {activeTab === "international" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Pickup Pincode"
                  placeholder="Enter 6 digit pickup area pincode"
                />
                <Input
                  label="Destination Country"
                  placeholder="For Example: United States"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Shipment Purpose
                </label>
                <select
                  className={`w-full border ${COLORS.BORDER_DEFAULT} rounded-md px-3 py-2`}
                >
                  <option>Gift</option>
                  <option>Commercial</option>
                  <option>Sample</option>
                  <option>Documents</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold block mb-2">
                    Actual Weight
                  </label>
                  <div className="flex">
                    <input
                      className={`border ${COLORS.BORDER_DEFAULT} rounded-l-md px-3 py-2 w-full`}
                      placeholder="0.00"
                    />
                    <span
                      className={`border ${COLORS.BORDER_DEFAULT} border-l-0 rounded-r-md px-4 flex items-center text-gray-500`}
                    >
                      KG
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Note: Minimum chargeable weight is 0.05kg
                  </p>
                </div>

                <div>
                  <label className="font-semibold block mb-2">Dimensions</label>
                  <div className="flex gap-3">
                    <DimInput placeholder="0.00" />
                    <DimInput placeholder="0.00" />
                    <DimInput placeholder="0.00" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="bg-blue-950 text-white px-8 py-3 rounded-lg font-semibold">
                  Calculate
                </button>
                <button className="border border-blue-950 text-blue-950 px-8 py-3 rounded-lg font-semibold">
                  Reset
                </button>
              </div>
            </>
          )}

          {/* ================= DOMESTIC  ================= */}
          {activeTab === "domestic" && (
            <>
              {/* Shipment Type */}
              <div>
                <h3 className="font-semibold mb-3">Shipment Type</h3>
                <div className="flex gap-10">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={shipmentType === "forward"}
                      onChange={() => setShipmentType("forward")}
                    />
                    Forward
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={shipmentType === "return"}
                      onChange={() => setShipmentType("return")}
                    />
                    Return
                  </label>
                </div>
              </div>

              {/* Pincodes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Pickup Pincode"
                  placeholder="Enter 6 digit pickup area pincode"
                />
                <Input
                  label="Delivery Pincode"
                  placeholder="Enter 6 digit delivery area pincode"
                />
              </div>

              {/* Weight & Dimensions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold block mb-2">
                    Actual Weight
                  </label>
                  <div className="flex">
                    <input
                      className={`border ${COLORS.BORDER_DEFAULT} rounded-l-md px-3 py-2 w-full`}
                      placeholder="0.00"
                    />

                    <span
                      className={`border ${COLORS.BORDER_DEFAULT} border-l-0 rounded-r-md px-4 flex items-center text-gray-500`}
                    >
                      KG
                    </span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-2">
                    Dimensions <span className="text-gray-400">(Optional)</span>
                  </label>
                  <div className="flex gap-3">
                    <DimInput placeholder="L" />
                    <DimInput placeholder="B" />
                    <DimInput placeholder="H" />
                  </div>
                </div>
              </div>

              {shipmentType === "forward" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Payment Type</h3>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={paymentType === "cod"}
                          onChange={() => setPaymentType("cod")}
                        />
                        Cash on Delivery
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={paymentType === "prepaid"}
                          onChange={() => setPaymentType("prepaid")}
                        />
                        Prepaid
                      </label>
                    </div>
                  </div>

                  <Input
                    label="Shipment Value (₹)"
                    placeholder="Enter the shipment value"
                    prefix="₹"
                  />
                </div>
              )}

              {shipmentType === "return" && (
                <>
                  <Input
                    label="Shipment Value (₹)"
                    placeholder="Enter the shipment value"
                    prefix="₹"
                  />

                  <div>
                    <h3 className="font-semibold mb-3">QC Applicable?</h3>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-2">
                        <input type="radio" /> Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" /> No
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4">
                <button className="bg-blue-950 text-white px-8 py-3 rounded-lg font-semibold">
                  Calculate
                </button>
                <button className="border border-blue-950 text-blue-950 px-8 py-3 rounded-lg font-semibold">
                  Reset
                </button>
              </div>
            </>
          )}
        </div>

        {/* ================= RIGHT SIDE (TWO SAME BOXES) ================= */}
        <div className="bg-white rounded-xl p-8 flex flex-col justify-center gap-10">
          <LocationCard title="Pickup Location" />

          <LocationCard
            title={
              activeTab === "international"
                ? "Destination Country"
                : "Delivery Location"
            }
          />
        </div>
      </div>

      {/* ================= TERMS ================= */}
      <div className="bg-white rounded-xl p-8 mt-10">
        <h3 className="font-semibold mb-4">Terms & Conditions</h3>
        <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5 marker:text-blue-950">
          <li>
            Freight charges (GST inclusive) are based on higher of dead or
            volumetric weight.
          </li>
          <li>
            RTO shipment will be charged differently from forward delivery rate.
          </li>
          <li>COD fee is calculated on fixed or percentage basis.</li>
          <li>Volumetric weight is calculated as L×B×H / 5000.</li>
          <li>Maximum liability is limited to logistics partner terms.</li>
        </ul>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Input({
  label,
  placeholder,
  prefix,
}: {
  label: string;
  placeholder?: string;
  prefix?: string;
}) {
  return (
    <div>
      <label className="font-semibold block mb-2">{label}</label>
      <div className="flex">
        {prefix && (
          <span
            className={`border ${COLORS.BORDER_DEFAULT} rounded-l-md px-3 flex items-center text-gray-500`}
          >
            {prefix}
          </span>
        )}
        <input
          className={`border ${COLORS.BORDER_DEFAULT} px-3 py-2 w-full ${
            prefix ? "rounded-r-md border-l-0" : "rounded-md"
          }`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function DimInput({ placeholder }: { placeholder: string }) {
  return (
    <div
      className={`flex border ${COLORS.BORDER_DEFAULT} rounded-md overflow-hidden`}
    >
      <input className="w-16 px-2 py-2" placeholder={placeholder} />
      <span className="px-3 flex items-center text-gray-400 border-l">CM</span>
    </div>
  );
}

function LocationCard({ title }: { title: string }) {
  return (
    <div className="w-full text-center border-2 border-dotted border-blue-950 rounded-lg p-6">
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-gray-400">
        {title === "Destination Country" ? "Country" : "City, State"}
      </p>
    </div>
  );
}
