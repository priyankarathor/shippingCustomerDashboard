"use client";

import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  description?: string;
  image?: string;
  showAddButton?: boolean;
}

export default function EmptyState({
  title = "Add your first order to get started",
  description = "Once you add orders, they will appear here.",
  image = "/new_zero.webp",
  showAddButton = true,
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="py-24 flex flex-col items-center text-center"
    >
      {/* Image */}
      <motion.img
        src={image}
        alt="No Data"
        className="w-52 mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Text */}
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-6">{description}</p>

      {/* Actions */}
      <div className="flex gap-4">
        {showAddButton && (
          <button
            onClick={() => router.push("/order-add")}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white flex items-center gap-2"
          >
            <FaPlus /> Add Return
          </button>
        )}

        <button className="px-6 py-2 rounded-xl border bg-white dark:bg-slate-800">
          Sync Website Orders
        </button>
      </div>
    </motion.div>
  );
}
