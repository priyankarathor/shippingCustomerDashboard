"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OrderHeaderProps {
  activeNav: "domestic" | "international";
  setActiveNav: (nav: "domestic" | "international") => void;
  title?: string;
}

export default function OrderHeader({
  activeNav,
  setActiveNav,
  title = "Add New Order",
}: OrderHeaderProps) {
  const router = useRouter();

  const handleNavClick = (item: "domestic" | "international") => {
    if (item === "domestic") {
      router.push("/order-add/Domestic"); // <-- match your route file
    } else {
      router.push("/order-add/"); // <-- match your route file
    }
    setActiveNav(item);
  };

  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Link href="/allorder" className="hover:text-black">
          Orders
        </Link>
        <span>/</span>
        <span className="text-black font-medium">{title}</span>
      </div>

      {/* Back + Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/allorder")}
          className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-4 h-4 text-black" />
        </button>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold"
        >
          {title}
        </motion.h1>
      </div>

      {/* Domestic / International Nav */}
      <div className="flex gap-6 border-b border-gray-300">
        {["domestic", "international"].map((item) => (
          <button
            key={item}
            onClick={() => handleNavClick(item as "domestic" | "international")}
            className={`pb-3 text-sm tracking-wide relative ${
              activeNav === item ? "text-black" : "text-gray-500"
            }`}
          >
            {item.toUpperCase()}

            {activeNav === item && (
              <motion.span
                layoutId="underline"
                className="absolute left-0 bottom-0 h-[2px] w-full bg-black"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
