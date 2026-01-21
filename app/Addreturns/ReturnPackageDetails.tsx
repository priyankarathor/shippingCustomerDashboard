"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Package {
  id: number;
  deadWeight: string;
  length: string;
  width: string;
  height: string;
  volumetricWeight: number;
  applicableWeight: number;
}

export default function PackageDetails() {
  const [packages, setPackages] = useState<Package[]>([
    { id: 1, deadWeight: "", length: "", width: "", height: "", volumetricWeight: 0, applicableWeight: 0 },
  ]);

  const handleInputChange = (
    id: number,
    field: keyof Omit<Package, "id" | "volumetricWeight" | "applicableWeight">,
    value: string
  ) => {
    setPackages((prev) => prev.map((pkg) => (pkg.id === id ? { ...pkg, [field]: value } : pkg)));
  };

  useEffect(() => {
    setPackages((prev) =>
      prev.map((pkg) => {
        const deadWeight = Number(pkg.deadWeight) || 0;
        const length = Number(pkg.length) || 0;
        const width = Number(pkg.width) || 0;
        const height = Number(pkg.height) || 0;

        const volWeight = length > 0 && width > 0 && height > 0 ? (length * width * height) / 5000 : 0;
        const appWeight = Math.max(deadWeight, volWeight);

        return { ...pkg, volumetricWeight: Number(volWeight.toFixed(2)), applicableWeight: Number(appWeight.toFixed(2)) };
      })
    );
  }, [
    packages
      .map((p) => [p.deadWeight, p.length, p.width, p.height])
      .flat()
      .join(","),
  ]);

  const addPackage = () => {
    setPackages((prev) => [
      ...prev,
      { id: prev.length + 1, deadWeight: "", length: "", width: "", height: "", volumetricWeight: 0, applicableWeight: 0 },
    ]);
  };

  const removePackage = (id: number) => setPackages((prev) => prev.filter((pkg) => pkg.id !== id));

  const totalApplicableWeight = packages.reduce((acc, pkg) => acc + pkg.applicableWeight, 0);

  return (
    <div className="space-y-6  bg-white">

      <AnimatePresence>
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-gray-50 text-black rounded-2xl shadow-md space-y-4 relative hover:shadow-lg transition-shadow duration-300 "
          >
            <h3 className="text-xl font-semibold tracking-wide">Package {index + 1}</h3>

            {packages.length > 1 && (
              <button
                onClick={() => removePackage(pkg.id)}
                className="absolute top-4 right-4 text-red-500 font-bold hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            )}

            {/* Dead Weight */}
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">Dead Weight (kg)</label>
              <input
                type="number"
                step="0.001"
                min={0.05}
                max={999.999}
                value={pkg.deadWeight}
                onChange={(e) => handleInputChange(pkg.id, "deadWeight", e.target.value)}
                placeholder="Enter weight in kg"
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 transition-all"
              />
              <p className="text-gray-500 text-sm">
                Max 3 digits after decimal. Minimum chargeable weight is 0.05kg.
              </p>
            </div>

            {/* Dimensions */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Package Dimensions (cm)</label>
              <div className="grid grid-cols-3 gap-3">
                {["length", "width", "height"].map((dim) => (
                  <input
                    key={dim}
                    type="number"
                    step="0.1"
                    min={0.5}
                    value={pkg[dim as keyof Package]}
                    onChange={(e) => handleInputChange(pkg.id, dim as any, e.target.value)}
                    placeholder={dim.charAt(0).toUpperCase() + dim.slice(1)}
                    className="p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 transition-all"
                  />
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                Note: Dimensions should be in centimeters & greater than 0.5cm.
              </p>
            </div>

            {/* Result Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-4 rounded-xl bg-gray-50 border border-gray-300 shadow-sm space-y-2 hover:shadow-md transition-shadow duration-300"
            >
              <p>
                <span className="font-semibold">Volumetric Weight: </span>
                <motion.span
                  key={pkg.volumetricWeight}
                  initial={{ count: 0 }}
                  animate={{ count: pkg.volumetricWeight }}
                  transition={{ duration: 0.6 }}
                >
                  {pkg.volumetricWeight.toFixed(2)}
                </motion.span>{" "}
                kg
              </p>
              <p>
                <span className="font-semibold">Applicable Weight: </span>
                <motion.span
                  key={pkg.applicableWeight}
                  initial={{ count: 0 }}
                  animate={{ count: pkg.applicableWeight }}
                  transition={{ duration: 0.6 }}
                >
                  {pkg.applicableWeight.toFixed(2)}
                </motion.span>{" "}
                kg
              </p>
              <p className="text-gray-500 text-sm">
                Applicable weight is the heavier of Dead Weight & Volumetric Weight.
              </p>
              <p className="text-gray-500 text-sm">
                Final chargeable weight follows courier's weight slab.
              </p>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Package Button */}
      <button
        onClick={addPackage}
        className="px-5 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-black font-semibold transition-all shadow-sm hover:shadow-md"
      >
        + Add Another Package
      </button>

      {/* Total Applicable Weight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-2xl bg-gray-50 border border-gray-300 shadow-sm space-y-2 text-center"
      >
        <h3 className="text-xl font-semibold text-black">Total Applicable Weight</h3>
        <motion.p
          key={totalApplicableWeight}
          initial={{ count: 0 }}
          animate={{ count: totalApplicableWeight }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-black"
        >
          {totalApplicableWeight.toFixed(2)} kg
        </motion.p>
        <p className="text-gray-500 text-sm">
          Sum of all packages’ applicable weight. Basis for freight charges.
        </p>
      </motion.div>
    </div>
  );
}
