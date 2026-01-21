"use client";

import { Wallet, Smartphone, Truck, FileText, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCard from "../components/ui/AnimatedCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RechargeWalletModal from "../components/RechargeWalletModal";

export default function DashboardPage() {
  const router = useRouter();
  const [openRecharge, setOpenRecharge] = useState(false);

  return (
    <div className="w-full bg-gray-50 py-10  space-y-10">
      {/* RECHARGE BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500
 p-5 text-white"
      >
        {/* Glow */}
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/20 rounded-full blur-2xl" />

        <div className="flex items-center gap-4 z-10">
          <div className="h-11 w-11 rounded-lg bg-white/20 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Boost Your Wallet: Pay ₹250, Get ₹300{" "}
            </h2>
            <p className="text-sm opacity-90">
              Limited-time bonus wallet credit{" "}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpenRecharge(true)}
          className="z-10 bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Recharge Now
        </button>
      </motion.div>

      {/* GETTING STARTED  */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Getting Started
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {/* Recharge */}
          <AnimatedCard delay={0.1}>
            <div
              className="h-full border border-dashed border-blue-300 bg-blue-50
 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                  <Wallet
                    className="text-blue-600
 w-5 h-5"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-blue-700">
                    Recharge Bonus Available
                  </h4>
                  <p className="text-xs text-blue-600 mt-1">
                    Add funds and start shipping instantly{" "}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpenRecharge(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Recharge
              </button>
            </div>
          </AnimatedCard>

          {/* KYC */}
          <AnimatedCard delay={0.2}>
            <div className="h-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="text-blue-600 w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Complete your KYC
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Complete verification to activate shipping
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push("/kyc/step1")}
                className="
    bg-blue-600
    text-white
    px-4
    py-2
    rounded-lg
    text-sm
    font-medium
    whitespace-nowrap
    min-w-[110px]
    hover:bg-blue-700
    transition
  "
              >
                Verify KYC
              </button>
            </div>
          </AnimatedCard>

          {/* Ship Orders */}
          <AnimatedCard delay={0.3}>
            <div className="h-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="text-blue-600 w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Start Shipping
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Book shipments and arrange pickups easily
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push("/order-add")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Start Shipping
              </button>
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/*  SUMMARY  */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          {/* Orders */}
          <AnimatedCard delay={0.4}>
            <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="text-blue-600 w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Orders
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Today: 0 | Yesterday: 0
                  </p>
                </div>
              </div>

              <span className="text-xl font-semibold text-gray-900">0</span>
            </div>
          </AnimatedCard>

          {/* Revenue */}
          <AnimatedCard delay={0.5}>
            <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="text-purple-600 w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Revenue
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Today: ₹0 | Yesterday: ₹0
                  </p>
                </div>
              </div>

              <span className="text-xl font-semibold text-gray-900">₹0</span>
            </div>
          </AnimatedCard>
        </div>
      </div>
      {/*  ACTIONS NEEDING ATTENTION  */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Today’s Priority Actions{" "}
        </h3>

        <div className="bg-white rounded-xl p-6 shadow-sm max-w-md">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Orders pending processing</p>
              <p className="text-2xl font-semibold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      {/*  UPCOMING PICKUPS  */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Upcoming Shipment Pickups{" "}
        </h3>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Date Tabs */}
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium">
                Sept 13, 2025
              </button>

              <button className="px-3 py-1 rounded-lg text-gray-500 text-sm hover:bg-gray-100">
                Oct 14, 2025
              </button>
            </div>

            {/* Download Buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <FileText className="w-4 h-4" />
                Labels
              </button>

              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <FileText className="w-4 h-4" />
                Invoices
              </button>

              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <FileText className="w-4 h-4" />
                Manifests
              </button>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm text-gray-500">
              No pickups scheduled for this date
            </p>
          </div>
        </div>
      </div>
      <RechargeWalletModal
        open={openRecharge}
        onClose={() => setOpenRecharge(false)}
      />
    </div>
  );
}
