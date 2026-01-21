"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowLeft, UploadCloud } from "lucide-react";
import AddPickupreturnAddressSidebar from "./AddPickupreturnAddressSidebar";
import OrderDetails from "./OrderDetails";
import ReturnPackageDetails from "./ReturnPackageDetails";




const orderTypes = ["Single Order", "Bulk Order"];

const steps = [
  "Buyer Details",
  "Pickup Details",
  "Order Details",
  "Package Details",
];

export default function AddReturnPage() {
  const router = useRouter();

  const [activeType, setActiveType] = useState(orderTypes[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [openPickupSidebar, setOpenPickupSidebar] = useState<boolean>(false);
  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 px-8 py-6 mt-10"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/Return")}
          className="p-2 rounded-md bg-white border"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-3xl font-semibold">Add Return</h1>
      </div>

      {/* ORDER TYPE */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {orderTypes.map((type) => (
          <motion.div
            key={type}
            onClick={() => setActiveType(type)}
            whileHover={{ scale: 1.05 }}
            className={`cursor-pointer rounded-xl p-4 text-center border
              ${activeType === type
                ? "bg-gray-200 border-black"
                : "bg-white border-gray-300"
              }`}
          >
            {type}
          </motion.div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div
        className={`grid gap-8 ${activeType === "Bulk Order"
            ? "grid-cols-1"
            : "grid-cols-1 lg:grid-cols-3"
          }`}
      >
        {/* LEFT STEPS (ONLY SINGLE ORDER) */}
        {activeType === "Single Order" && (
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-4 rounded-lg border
                  ${currentStep === i
                    ? "bg-gray-200 border-black"
                    : "bg-white border-gray-300"
                  }`}
              >
                <CheckCircle className="w-5 h-5" />
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        )}

        {/* RIGHT CONTENT */}
        <div
          className={
            activeType === "Bulk Order" ? "w-full" : "lg:col-span-2"
          }
        >
          {/* ================= BULK ORDER ================= */}
          {activeType === "Bulk Order" ? (
            <div className="bg-white border rounded-2xl p-6 w-full">
              <h2 className="text-lg font-semibold mb-1">
                Import Bulk Returns
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Download the sample file and replace its data with your return
                data. Make sure all mandatory fields are filled. Save the file
                and upload it back.
              </p>

              {/* Upload Box */}
              <div className="border-2 border-dashed border-indigo-400 rounded-xl p-12 text-center bg-indigo-50">
                <UploadCloud className="mx-auto h-10 w-10 text-indigo-500 mb-3" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and Drop to upload the files here
                </p>
                <p className="text-xs text-gray-400 mb-4">OR</p>
                <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm">
                  Browse and Upload
                </button>
                <p className="text-xs text-gray-400 mt-3">
                  Only csv, xls, xlsx file formats will be accepted.
                </p>
              </div>

              {/* INFO */}
              <div className="mt-6 bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg">
                The successful orders will be directed to Process Orders. You
                can download your error files from below.
              </div>

              {/* RECENT UPLOADS */}
              <div className="mt-6">
                <div className="flex justify-between mb-3">
                  <h3 className="font-medium">Recent Uploads</h3>
                  <span className="text-sm text-gray-400">
                    Last 10 days of activity
                  </span>
                </div>
                <div className="border rounded-lg p-6 text-center text-sm text-gray-400">
                  No Data Found
                </div>
              </div>
            </div>
          ) : (





            /* ================= SINGLE ORDER ================= */
            <div className="bg-white border rounded-2xl p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {/* ================= STEP 0 ================= */}
                  {currentStep === 0 && (
                    <div className="space-y-8">
                      {/* ===== BUYER INFO ===== */}
                      <div>
                        <h2 className="text-lg font-semibold mb-4">
                          From whom is the return being picked up?
                          <span className="block text-sm text-gray-500">
                            (Buyer's Info)
                          </span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="label">Mobile Number</label>
                            <div className="flex">
                              <span className="px-3 flex items-center bg-gray-100 border border-r-0 rounded-l-lg text-sm">
                                +91
                              </span>
                              <input
                                className="input rounded-l-none"
                                placeholder="Enter buyer's phone number"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="label">First Name</label>
                            <input
                              className="input"
                              placeholder="Enter first name"
                            />
                          </div>

                          <div>
                            <label className="label">Last Name</label>
                            <input
                              className="input"
                              placeholder="Enter last name"
                            />
                          </div>

                          <div>
                            <label className="label">
                              Email Id{" "}
                              <span className="text-gray-400">(Optional)</span>
                            </label>
                            <input
                              className="input"
                              placeholder="i.e abc@gmail.com"
                            />
                          </div>
                        </div>
                      </div>

                      <hr />

                      {/* ===== BUYER ADDRESS ===== */}
                      <div>
                        <h2 className="text-lg font-semibold mb-4">
                          Where is the return being picked from?
                          <span className="block text-sm text-gray-500">
                            (Buyer's Address)
                          </span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="label">
                              Complete Address
                            </label>
                            <input
                              className="input"
                              placeholder="House/Floor No. Building Name or Street, Locality"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="label">
                              Landmark{" "}
                              <span className="text-gray-400">
                                (Optional)
                              </span>
                            </label>
                            <input
                              className="input"
                              placeholder="Nearby post office, market, hospital"
                            />
                          </div>

                          <div>
                            <label className="label">Pincode</label>
                            <input
                              className="input"
                              placeholder="Enter Buyer's Pincode"
                            />
                          </div>

                          <div>
                            <label className="label">City</label>
                            <input
                              className="input"
                              placeholder="Enter Buyer's City"
                            />
                          </div>

                          <div>
                            <label className="label">State</label>
                            <select className="input">
                              <option>Please Select State</option>
                              <option>Karnataka</option>
                              <option>Maharashtra</option>
                              <option>Delhi</option>
                            </select>
                          </div>

                          <div>
                            <label className="label">Country</label>
                            <select className="input">
                              <option>India</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= STEP 1 ================= */}
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-lg font-medium mb-4 text-black">
                        Pickup Address
                        <span className="block text-sm text-gray-500">
                          Select or add a pickup address
                        </span>
                      </h2>

                      <div className="mb-6">
                        <input
                          type="text"
                          placeholder="Search address..."
                          className="input w-full"
                        />
                      </div>

                      {/* Recently Used Addresses */}
                      <h3 className="text-md font-semibold mb-3 text-black">
                        Recently Used Addresses
                      </h3>
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        {[{ id: 1, primary: true, address: "123, Market Street, City", number: "+91 9876543210" }].map(
                          (item) => (
                            <motion.div
                              key={item.id}
                              whileHover={{
                                scale: 1.03,
                                y: -2,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                              }}
                              className="bg-gray-50 border border-gray-300 rounded-2xl p-6 relative cursor-pointer h-60 w-full md:w-[520px]"
                            >
                              {/* Edit Icon */}
                              <button
                                onClick={() => alert("Edit Address")}
                                className="absolute top-3 left-3 text-blue-600 hover:text-blue-500"
                              >
                                <ArrowLeft className="w-4 h-4 rotate-45" />
                              </button>

                              {/* Verified Badge */}
                              {item.primary && (
                                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4" /> Verified
                                </span>
                              )}

                              {item.primary && (
                                <p className="text-sm font-semibold text-green-600 mb-2">
                                  Primary
                                </p>
                              )}

                              <p className="text-black font-medium mb-1">{item.address}</p>
                              <p className="text-gray-600 text-sm mb-3">{item.number}</p>
                              <hr className="border-gray-300 my-3" />
                              <p className="text-xs text-gray-500">Last used • Ready for pickup</p>
                            </motion.div>
                          )
                        )}
                      </div>

                      {/* Other Addresses */}
                      <h3 className="text-md font-semibold mb-3 text-black">Other Addresses</h3>
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        {[{ id: 3, address: "789, Lake Road, City", number: "+91 9988776655" }].map(
                          (item) => (
                            <motion.div
                              key={item.id}
                              whileHover={{
                                scale: 1.03,
                                y: -2,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                              }}
                              className="bg-gray-50 border border-gray-300 rounded-2xl p-6 relative cursor-pointer h-60 w-full md:w-[520px]"
                            >
                              <button
                                onClick={() => alert("Edit Address")}
                                className="absolute top-3 left-3 text-blue-600 hover:text-blue-500"
                              >
                                <ArrowLeft className="w-4 h-4 rotate-45" />
                              </button>

                              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <ArrowLeft className="w-4 h-4 rotate-45" /> Location
                              </span>

                              <p className="text-black font-medium mb-1">{item.address}</p>
                              <p className="text-gray-600 text-sm mb-3">{item.number}</p>
                              <hr className="border-gray-300 my-3" />
                              <p className="text-xs text-gray-500">Secondary pickup address</p>
                            </motion.div>
                          )
                        )}
                      </div>

                      {/* Add New Pickup Address */}
                      <motion.div
                        whileHover={{
                          scale: 1.03,
                          y: -2,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        }}
                        onClick={() => setOpenPickupSidebar(true)}
                        className="mt-6 bg-gray-100 border border-dashed border-gray-300 rounded-2xl p-6 cursor-pointer h-60 w-full md:w-[520px] flex items-center justify-center text-black font-semibold text-lg hover:bg-gray-200 transition"
                      >
                        + Add New Pickup Address
                      </motion.div>
                    </div>
                  )}

                    {currentStep === 2 && <OrderDetails currentStep={currentStep} />}
                    {currentStep === 3 && <ReturnPackageDetails />}

                </motion.div>
              </AnimatePresence>

              {/* FOOTER BUTTONS */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex-1 py-3 border rounded-xl"
                >
                  Back
                </button>

                  <motion.button
                                onClick={() => {
                                  if (currentStep === steps.length - 1) {
                                    router.push("/Return");
                                  } else {
                                    nextStep();
                                  }
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 py-3 rounded-xl bg-black text-white font-semibold tracking-wide"
                              >
                                {currentStep === steps.length - 1 ? "Finish" : "Next"}
                              </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
      <AddPickupreturnAddressSidebar
              open={openPickupSidebar}
              onClose={() => setOpenPickupSidebar(false)}
            />

      {/* INPUT STYLES */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 14px;
          font-size: 14px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          outline: none;
        }
        .label {
          display: block;
          font-size: 13px;
          margin-bottom: 6px;
          font-weight: 500;
        }
      `}</style>
    </motion.div>
  );
}
