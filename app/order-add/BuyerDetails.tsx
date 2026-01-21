"use client";

import { useState } from "react";

type Step0Props = {
  showInput: boolean;
  setShowInput: (value: boolean) => void;
  alternateNumber: string;
  setAlternateNumber: (value: string) => void;
};

export default function Step0({
  showInput,
  setShowInput,
  alternateNumber,
  setAlternateNumber,
}: Step0Props) {
  return (
    <>
      <h2 className="text-lg font-medium mb-4 text-black">
        Where is the order delivered to?
        <span className="block text-sm text-gray-500">(Buyer’s Shipping Address)</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {["Country", "Pincode", "State", "City", "Currency"].map((field) => (
          <input key={field} placeholder={field} className="input" />
        ))}
        <input placeholder="Address Line 1" className="input md:col-span-2" />
        <input placeholder="Address Line 2" className="input md:col-span-2" />
      </div>

      <label className="flex items-center gap-2 text-sm mb-8 text-black">
        <input type="checkbox" className="accent-black" />
        Billing address same as shipping address
      </label>

      <h2 className="text-lg font-medium mb-4 text-black">
        To whom is the order being delivered?
        <span className="block text-sm text-gray-500">(Buyer Info)</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input placeholder="Full Name" className="input" />
        <input placeholder="Mobile Number" className="input" />
        <input placeholder="Email ID" className="input md:col-span-2" />
      </div>

      <div>
        <button
          className="text-sm text-black mb-4"
          onClick={() => setShowInput(true)}
        >
          Add alternate mobile number +
        </button>

        {showInput && (
          <input
            type="tel"
            placeholder="Enter alternate mobile number"
            value={alternateNumber}
            onChange={(e) => setAlternateNumber(e.target.value)}
            className="input border border-gray-300 rounded p-2 w-full mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input placeholder="Company Name" className="input" />
        <input placeholder="GSTIN (Optional)" className="input" />
      </div>

      <div className="mb-8">
        <p className="text-sm mb-3 text-black">Shipping Purpose</p>
        <div className="flex gap-4 flex-wrap">
          {["Gift", "Sample (CSB4)", "Commercial"].map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full cursor-pointer border border-gray-300 hover:border-black"
            >
              <input type="radio" name="purpose" className="accent-black" />
              <span className="text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>





        <style jsx>{`
        .input {
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          padding: 12px 14px;
          color: black;
          font-size: 14px;
          outline: none;
        }
        .input::placeholder {
          color: #6b7280;
        }
        .input:focus {
          border-color: black;
        }
      `}</style>
    </>
    
  );
}
