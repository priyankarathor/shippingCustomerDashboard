"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";

import AddPickupAddressSidebar from "./AddPickupAddressSidebar";
import OrderForm from "./OrderForm";
import PackageDetails from "./PackageDetails";
import PickupDetails from "./PickupDetails";
import BuyerDetails from "./BuyerDetails";


import Link from "next/link";
import OrderHeader from "./OrderHeader";

const orderTypes = [
  "Single Order (E-commerce)",
  "Air Cargo / FBA",
  "Ocean Full Container",
  "Ocean Less than Container",
  "Bulk Order",
];

const steps = ["Buyer Details", "Pickup Details", "Order Details", "Package Details"];

export default function AddOrderPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState<"domestic" | "international">("international");
  const [activeType, setActiveType] = useState(orderTypes[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [openPickupSidebar, setOpenPickupSidebar] = useState<boolean>(false);
  const [showInput, setShowInput] = useState(false);
  const [alternateNumber, setAlternateNumber] = useState("");

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 text-black px-8 py-6 mt-10"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >


      {/* Reusable Header */}
      <OrderHeader activeNav={activeNav} setActiveNav={setActiveNav} title="Add Order" />



      {/* Order Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {orderTypes.map((type) => (
          <motion.div
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (type === "Bulk Order") {
                router.push("/order-add/Bulkorder");
              } else {
                setActiveType(type);
              }
            }}
            className={`cursor-pointer rounded-xl p-4 text-center border transition-all
      ${activeType === type
                ? "border-black bg-gray-200"
                : "border-gray-300 bg-white hover:border-black"
              }`}
          >
            <p className="text-sm">{type}</p>
          </motion.div>
        ))}

      </div>

      {/* FORM SECTION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType + currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* LEFT STEPS */}
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-4 rounded-lg border ${currentStep === i
                  ? "border-black bg-gray-200"
                  : "border-gray-300 bg-white"
                  }`}
              >
                <CheckCircle className="w-5 h-5 text-black" />
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-2 bg-white border border-gray-300 rounded-2xl p-6">
            {currentStep === 0 && (
              <BuyerDetails
                showInput={showInput}
                setShowInput={setShowInput}
                alternateNumber={alternateNumber}
                setAlternateNumber={setAlternateNumber}
              />
            )}

            {currentStep === 1 && <PickupDetails setOpenPickupSidebar={setOpenPickupSidebar} />}
            {currentStep === 2 && <OrderForm currentStep={currentStep} />}
            {currentStep === 3 && <PackageDetails />}

            <div className="flex gap-4 mt-6">
              <motion.button
                onClick={prevStep}
                disabled={currentStep === 0}
                whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                className={`flex-1 py-3 rounded-xl border border-gray-300 ${currentStep === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black hover:bg-gray-200"
                  }`}
              >
                Back
              </motion.button>

              <motion.button
                onClick={() => {
                  if (currentStep === steps.length - 1) {
                    router.push("/allorder");
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
        </motion.div>
      </AnimatePresence>

      <AddPickupAddressSidebar
        open={openPickupSidebar}
        onClose={() => setOpenPickupSidebar(false)}
      />

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
    </motion.div>
  );
}
