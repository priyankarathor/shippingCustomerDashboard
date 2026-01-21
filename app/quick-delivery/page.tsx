"use client";

import {
  MapPin,
  Flag,
  Package,
  IndianRupee,
  CreditCard,
  Truck,
} from "lucide-react";

export default function QuickDeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-10">
          {/* ================= Delivery Details ================= */}
          <Card>
            <h2 className="text-3xl font-semibold mb-8">Delivery Details</h2>

            <div className="flex gap-5">
              {/* ICON COLUMN */}
              <div className="flex flex-col items-center">
                {/* Pickup Icon */}
                <div className="h-12 w-12 rounded-xl border bg-white flex items-center justify-center z-10">
                  <MapPin className="w-5 h-5" />
                </div>

                {/* DOTTED LINE */}
                <div className="flex-1 border-l-2 border-dashed border-gray-300" />

                {/* Drop Icon */}
                <div className="h-12 w-12 rounded-xl border bg-white flex items-center justify-center z-10">
                  <Flag className="w-5 h-5" />
                </div>
              </div>

              {/* INPUT COLUMN */}
              <div className="flex-1 space-y-8">
                <input
                  placeholder="Where is your Pickup ?"
                  className="w-full h-12 border rounded-lg px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  placeholder="Where is your Drop ?"
                  className="w-full h-12 border rounded-lg px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </Card>

          {/* ================= Package Details ================= */}
          <Card>
            <h2 className="text-3xl font-semibold mb-8">Package Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputWithLabel
                label="Package type *"
                icon={<Package />}
                placeholder="Select a package type"
              />

              <InputWithLabel
                label="Package value *"
                icon={<IndianRupee />}
                placeholder="Enter package value"
              />
            </div>

            {/* Pay for shipping */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-600 mb-4">
                Pay for shipping *
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectableCard icon={<CreditCard />} label="Prepaid" />
                <SelectableCard icon={<Truck />} label="Pay on delivery" />
              </div>
            </div>

            {/* Order ID */}
            <div className="mt-8">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">
                Channel order id (optional)
              </label>
              <input
                placeholder="Enter order id"
                className="w-full h-12 border rounded-lg px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </Card>

          {/* ================= App Download ================= */}
          <Card>
            <p className="text-lg font-semibold mb-6">Love what you see? ❤️</p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              {/* QR */}
              <div className="text-center">
                <div className="h-32 w-32 bg-gray-200 rounded-md mb-3 mx-auto" />
                <p className="text-sm text-gray-600">
                  Scan to download our app!
                </p>
              </div>

              <div className="text-gray-400 font-semibold">OR</div>

              {/* Store buttons */}
              <div className="space-y-4">
                <StoreButton text="Download on App Store" />
                <StoreButton text="Download on Google Play" />
              </div>
            </div>
          </Card>
        </div>

        {/* ================= RIGHT (CHECKOUT) ================= */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow px-6 py-6 sticky top-10 h-[520px]">
            <h2 className="text-3xl font-semibold mb-6">Checkout</h2>

            <div className="flex items-center justify-center text-center h-full px-6 text-gray-700">
              Add the pickup & drop locations to view the delivery options and
              pricing here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-xl shadow px-8 py-8">{children}</div>;
}

/* Icon + input row (Pickup / Drop) */
function InputRow({
  icon,
  placeholder,
}: {
  icon: React.ReactNode;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-5">
      <div className="h-12 w-12 rounded-xl border bg-white flex items-center justify-center">
        {icon}
      </div>

      <input
        placeholder={placeholder}
        className="flex-1 h-12 border rounded-lg px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

/* Labeled input */
function InputWithLabel({
  label,
  icon,
  placeholder,
}: {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-600 mb-2 block">
        {label}
      </label>

      <div className="flex items-center gap-3 h-12 border rounded-lg px-4">
        <div className="text-gray-600">{icon}</div>
        <input
          placeholder={placeholder}
          className="flex-1 outline-none text-sm"
        />
      </div>
    </div>
  );
}

/* Payment option card */
function SelectableCard({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 h-12 border rounded-lg px-4 cursor-pointer hover:border-blue-500 transition">
      <div className="text-gray-700">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  );
}

/* Store buttons */
function StoreButton({ text }: { text: string }) {
  return (
    <button className="w-52 h-12 bg-black text-white rounded-lg text-sm">
      {text}
    </button>
  );
}
