"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash } from "lucide-react";
import { UploadCloud } from "lucide-react";
import OrderHeader from "../OrderHeader";

type Product = {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  tax: number;
};

export default function DomesticOrder() {
  const [type, setType] = useState<"single" | "bulk">("single");
  const [activeNav, setActiveNav] = useState<"domestic" | "international">("domestic");

  /** ---------------- Single Order States ---------------- */
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "", unitPrice: 0, quantity: 1, discount: 0, tax: 0 },
  ]);
  const [deadWeight, setDeadWeight] = useState<number>(0);
  const [length, setLength] = useState<number | "">("");
  const [breadth, setBreadth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "prepaid" | "">("");
  const [orderChannel, setOrderChannel] = useState<string>("CUSTOM");
  const [orderTag, setOrderTag] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const orderChannels = ["CUSTOM", "Instagram", "Facebook", "WhatsApp"];

  /** ---------------- Bulk Upload States ---------------- */
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  /** ---------------- Product Functions ---------------- */
  const addProduct = () =>
    setProducts((prev) => [
      ...prev,
      { id: prev.length + 1, name: "", unitPrice: 0, quantity: 1, discount: 0, tax: 0 },
    ]);

  const removeProduct = (id: number) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const updateProduct = (id: number, key: keyof Product, value: any) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));

  const calculateVolumetricWeight = () =>
    length && breadth && height ? (length * breadth * height) / 5000 : 0;

  const applicableWeight = Math.max(deadWeight, calculateVolumetricWeight());

  const subTotal = products.reduce(
    (acc, p) => acc + (p.unitPrice * p.quantity - p.discount) * (1 + p.tax / 100),
    0
  );

  /** ---------------- Bulk Upload Handler ---------------- */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setUploadedFile(e.target.files[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="min-h-screen bg-gray-50 p-8 space-y-8 text-black"
    >
      {/* Header */}
      <OrderHeader activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Single / Bulk Toggle */}
      <div className="flex gap-2">
        {["single", "bulk"].map((t) => (
          <button
            key={t}
            onClick={() => setType(t as any)}
            className={`px-4 py-2 rounded-md text-sm border ${
              type === t
                ? "bg-purple-100 text-purple-600 border-purple-300"
                : "bg-white border-gray-300"
            }`}
          >
            {t === "single" ? "Single Order" : "Bulk Order"}
          </button>
        ))}
      </div>

      {/* ================= BULK ORDER UI ================= */}
      {type === "bulk" && (
        <div className="bg-white border rounded-2xl p-6 w-full space-y-6">
          <h2 className="text-lg font-semibold">Import Bulk Orders</h2>
          <p className="text-sm text-gray-500">
            Download the sample file and replace its data with your return data.
          </p>

          {/* Upload Box */}
          <div className="border-2 border-dashed border-indigo-400 rounded-xl p-12 text-center bg-indigo-50">
            <UploadCloud className="mx-auto h-10 w-10 text-indigo-500 mb-3" />
            <p className="text-sm text-gray-600 mb-2">Drag and Drop to upload files</p>
            <p className="text-xs text-gray-400 mb-4">OR</p>
            <input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileUpload} className="hidden" id="bulk-upload" />
            <label htmlFor="bulk-upload" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm cursor-pointer">
              Browse and Upload
            </label>
            {uploadedFile && <p className="mt-2 text-green-600">{uploadedFile.name} uploaded</p>}
            <p className="text-xs text-gray-400 mt-3">
              Only CSV, XLS, XLSX formats are accepted.
            </p>
          </div>

          {/* Recent Uploads */}
          <div className="mt-6">
            <div className="flex justify-between mb-3">
              <h3 className="font-medium">Recent Uploads</h3>
              <span className="text-sm text-gray-400">Last 10 days</span>
            </div>
            <div className="border rounded-lg p-6 text-center text-sm text-gray-400">
              No Data Found
            </div>
          </div>
        </div>
      )}

      {/* ================= SINGLE ORDER UI ================= */}
      {type === "single" && (
        <>
          {/* Pickup Address */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold mb-4">Pickup Address</h3>
            <button className="flex items-center gap-2 px-4 py-2 border border-dashed border-purple-300 text-purple-600 rounded-md text-sm">
              <Plus className="w-4 h-4" />
              Add your Pickup Address
            </button>
          </div>

          {/* Delivery Details */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold mb-1">Delivery Details</h3>
            <p className="text-sm text-gray-500 mb-6">
              Enter the Delivery Details of your buyer for whom you are making this order
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Mobile Number" prefix="+91" />
              <Input label="Full Name" />
              <Input label="Complete Address" />
              <Input label="Landmark (Optional)" />
              <Input label="Pincode" />
              <Input label="City" disabled />
              <Input label="State" disabled />
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-md flex items-center gap-2">
              <input type="checkbox" checked />
              <span className="text-sm font-medium">
                Billing Details are same as Delivery Details
              </span>
            </div>
          </div>

          {/* Product Order Form */}
          <div className="space-y-8 p-6 bg-white rounded-md border shadow-sm">
            <div className="space-y-4 p-4 rounded-md">
              <h2 className="font-semibold text-lg">Product Details</h2>

              {products.map((product) => (
                <div key={product.id} className="grid grid-cols-6 gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Enter or search your product name"
                    value={product.name}
                    onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                    className="col-span-2 border rounded px-2 py-1"
                  />
                  <input
                    type="number"
                    value={product.unitPrice}
                    onChange={(e) => updateProduct(product.id, "unitPrice", parseFloat(e.target.value))}
                    className="border rounded px-2 py-1"
                  />
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => updateProduct(product.id, "quantity", Math.max(1, product.quantity - 1))}
                      className="px-2 py-1 border rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => updateProduct(product.id, "quantity", parseInt(e.target.value))}
                      className="w-12 text-center border-t border-b"
                    />
                    <button
                      type="button"
                      onClick={() => updateProduct(product.id, "quantity", product.quantity + 1)}
                      className="px-2 py-1 border rounded-r"
                    >
                      +
                    </button>
                  </div>
                  <input
                    type="number"
                    value={product.discount}
                    onChange={(e) => updateProduct(product.id, "discount", parseFloat(e.target.value))}
                    className="border rounded px-2 py-1"
                    placeholder="₹ 0.00"
                  />
                  <input
                    type="number"
                    value={product.tax}
                    onChange={(e) => updateProduct(product.id, "tax", parseFloat(e.target.value))}
                    className="border rounded px-2 py-1"
                    placeholder="% 0.00"
                  />
                  <button onClick={() => removeProduct(product.id)} className="text-red-500">
                    <Trash />
                  </button>
                </div>
              ))}

              <button type="button" onClick={addProduct} className="mt-2 text-purple-600 font-medium">
                + Add Another Product
              </button>

              {/* Totals */}
              <div className="mt-4 bg-gray-50 p-4 rounded">
                <div className="flex justify-between">
                  <span>Sub-total for Product</span>
                  <span>₹ {subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Charges</span>
                  <span>₹ 0</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total Order Value</span>
                  <span>₹ {subTotal.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Note: All the Prices/ Charges are inclusive of GST.
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-8 p-6 bg-white rounded-md border shadow-sm">
            <div className="p-4 rounded-md space-y-2">
              <h2 className="font-semibold text-lg">Payment Method</h2>
              <p className="text-sm text-gray-500">
                Select the payment mode, chosen by the buyer for this order.
              </p>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 border px-3 py-2 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2 border px-3 py-2 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "prepaid"}
                    onChange={() => setPaymentMethod("prepaid")}
                  />
                  Prepaid
                </label>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="space-y-8 p-6 bg-white rounded-md border shadow-sm">
            <div className="rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold">Package Details</h2>
              <p className="text-gray-500 text-sm">
                Provide the details of the final package that includes all the ordered items packed together.
              </p>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dead Weight</label>
                  <input
                    type="number"
                    value={deadWeight}
                    onChange={(e) => setDeadWeight(parseFloat(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                    placeholder="0.00"
                  />
                  <span className="text-xs text-gray-400">kg (Min 0.5 kg)</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Length</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(parseFloat(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                    placeholder="Length"
                  />
                  <span className="text-xs text-gray-400">cm</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Breadth</label>
                  <input
                    type="number"
                    value={breadth}
                    onChange={(e) => setBreadth(parseFloat(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                    placeholder="Breadth"
                  />
                  <span className="text-xs text-gray-400">cm</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Height</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                    placeholder="Height"
                  />
                  <span className="text-xs text-gray-400">cm</span>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Volumetric Weight</label>
                <input
                  type="number"
                  value={calculateVolumetricWeight()}
                  disabled
                  className="mt-1 block w-1/2 rounded-md border-gray-300 bg-gray-100 shadow-sm"
                />
                <span className="text-xs text-gray-400 ml-2">kg</span>
              </div>

              <div className="mt-4 bg-green-100 text-green-800 p-2 rounded">
                Applicable Weight: <span className="font-semibold">{applicableWeight.toFixed(2)} kg</span>
              </div>

              <p className="text-gray-500 text-sm mt-2">
                Pack like a Pro - Guidelines for Packaging and Measuring
              </p>
            </div>
          </div>

          {/* Other Details */}
          <div className="space-y-8 p-6 bg-white rounded-md border shadow-sm">
            <div className="rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold">Other Details</h2>

              <div className="flex flex-wrap gap-2">
                {orderChannels.map((channel) => (
                  <button
                    key={channel}
                    onClick={() => setOrderChannel(channel)}
                    className={`px-3 py-1 rounded border ${
                      orderChannel === channel ? "bg-purple-500 text-white" : "border-gray-300"
                    }`}
                  >
                    {channel}{" "}
                    {channel !== "CUSTOM" && <span className="text-xs bg-gray-200 rounded px-1 ml-1">+ Add</span>}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Order Tag (Press Enter to Add Tag)"
                  value={orderTag}
                  onChange={(e) => setOrderTag(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm p-2"
                />
                <input
                  type="text"
                  value=" number"
                  className="rounded-md border-gray-300 bg-gray-100 shadow-sm p-2"
                />
                <input
                  type="text"
                  placeholder="Notes (Optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm p-2"
                  maxLength={300}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-8 p-6 bg-white rounded-md shadow-sm">
            <div className="flex gap-4">
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed" disabled>
                Ship Now
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded">
                Add Order
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

/** ---------------- Input Component ---------------- */
function Input({ label, prefix, disabled }: { label: string; prefix?: string; disabled?: boolean }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <div className="flex">
        {prefix && <span className="px-3 py-2 border border-r-0 rounded-l-md bg-gray-100">{prefix}</span>}
        <input
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-md text-sm ${prefix ? "rounded-l-none" : ""} ${
            disabled ? "bg-gray-100" : "bg-white"
          }`}
        />
      </div>
    </div>
  );
}
