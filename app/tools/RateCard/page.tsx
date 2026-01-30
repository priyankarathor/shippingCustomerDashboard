"use client";

import { useState } from "react";
import { ChevronDown, FileText, Check, Plane } from "lucide-react";
import { COLORS } from "@/app/styles/colors";

const forwardCouriers = [
  "Amazon",
  "Bharat",
  "Blitz",
  "BlueDart",
  "Delhivery",
  "DTDC Ecom",
  "Ekart",
  "India",
  "Shiprocket",
  "Xpressbees",
];

const reverseCouriers = ["Delhivery", "Ecom", "Xpressbees", "Shadowfax"];
const modesList = ["Air", "Surface", "HyperLocal"];
const weightList = ["0.25kg", "0.5kg", "1kg", "2kg", "5kg", "10kg"];
const plans = ["Lite", "Basic", "Advanced", "Pro"];

export default function RateCardPage() {
  const [activeTab, setActiveTab] = useState<"domestic" | "international">(
    "domestic",
  );
  const [activeType, setActiveType] = useState<
    "forward" | "reverse" | "document"
  >("forward");

  const couriers = activeType === "reverse" ? reverseCouriers : forwardCouriers;

  const [openCouriers, setOpenCouriers] = useState<Set<string>>(
    new Set(couriers),
  );

  /* ================= FILTER STATES ================= */
  const [courierOpen, setCourierOpen] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);

  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);

  /* ================= SORT STATE ================= */
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"az" | "za">("az");

  /* ================= PLAN STATE ================= */
  const [planOpen, setPlanOpen] = useState(false);
  const [activePlan, setActivePlan] = useState("Lite");

  const toggleCourierRow = (courier: string) => {
    setOpenCouriers((prev) => {
      const next = new Set(prev);
      next.has(courier) ? next.delete(courier) : next.add(courier);
      return next;
    });
  };

  const closeAllTopDropdowns = () => {
    setCourierOpen(false);
    setModeOpen(false);
    setWeightOpen(false);
    setSortOpen(false);
    setPlanOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-5">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mt-10">
        <h1 className="text-xl font-bold">Rate Card</h1>

        {/* ================= PLAN DROPDOWN ================= */}
        <div className="relative">
          <button
            onClick={() => {
              closeAllTopDropdowns();
              setPlanOpen((v) => !v);
            }}
            className={`border ${COLORS.BORDER_DEFAULT} rounded-md px-4 py-2 text-sm flex items-center gap-2 bg-white`}
          >
            <span>
              Plan : <span className="font-semibold">{activePlan}</span>
            </span>
            {activePlan === "Lite" && (
              <span className="text-green-600 font-medium">(Active Plan)</span>
            )}
            <ChevronDown
              size={16}
              className={`transition-transform ${planOpen ? "rotate-180" : ""}`}
            />
          </button>

          {planOpen && (
            <div
              className={`absolute right-0 mt-2 w-44 bg-white border ${COLORS.BORDER_DEFAULT} rounded-lg shadow-lg text-sm z-50`}
            >
              {plans.map((plan) => (
                <button
                  key={plan}
                  onClick={() => {
                    setActivePlan(plan);
                    setPlanOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                >
                  <span>{plan}</span>
                  {activePlan === plan && (
                    <Check className="text-green-600" size={16} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= TOP TABS ================= */}
      <div className={`flex gap-6 border-b ${COLORS.BORDER_DEFAULT} text-sm`}>
        {["domestic", "international"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2 font-semibold capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-950 text-blue-950"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= SUB TABS ================= */}
      <div className="flex items-center gap-4 text-xs">
        {["forward", "reverse", "document"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setActiveType(type as any);
              setOpenCouriers(
                new Set(type === "reverse" ? reverseCouriers : forwardCouriers),
              );
            }}
            className={`px-4 py-1.5 rounded-md font-medium ${
              activeType === type
                ? "bg-blue-50 text-blue-950 border border-blue-950"
                : `border ${COLORS.BORDER_DEFAULT} text-gray-600`
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}

        <a
          href="#"
          className="ml-3 text-blue-950 underline text-xs font-medium"
        >
          Click here for India Post Rates
        </a>
      </div>

      {/* ================= INTERNATIONAL VIEW ================= */}
      {activeTab === "international" ? (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-xl">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-blue-100 blur-2xl" />
            <Plane className="relative w-16 h-16 text-blue-950 rotate-[-20deg]" />
          </div>

          <h2 className="text-3xl font-bold text-blue-950 mb-2">
            Coming Soon!
          </h2>
          <p className="text-sm text-gray-500">
            International rate cards will be available shortly.
          </p>
        </div>
      ) : (
        <>
          {/* ================= FILTER ROW ================= */}
          <div className="flex items-center justify-between relative">
            <div className="flex gap-4">
              <Dropdown
                label="Select Couriers"
                open={courierOpen}
                setOpen={(v) => {
                  closeAllTopDropdowns();
                  setCourierOpen(v);
                }}
                items={forwardCouriers}
                selected={selectedCouriers}
                setSelected={setSelectedCouriers}
              />

              <Dropdown
                label="Select Modes"
                open={modeOpen}
                setOpen={(v) => {
                  closeAllTopDropdowns();
                  setModeOpen(v);
                }}
                items={modesList}
                selected={selectedModes}
                setSelected={setSelectedModes}
              />

              <Dropdown
                label="Select Weights"
                open={weightOpen}
                setOpen={(v) => {
                  closeAllTopDropdowns();
                  setWeightOpen(v);
                }}
                items={weightList}
                selected={selectedWeights}
                setSelected={setSelectedWeights}
              />
            </div>

            {/* ================= SORT DROPDOWN ================= */}
            <div className="relative">
              <button
                onClick={() => {
                  closeAllTopDropdowns();
                  setSortOpen((v) => !v);
                }}
                className={`flex items-center gap-2 bg-white border ${COLORS.BORDER_DEFAULT} rounded-md px-4 py-2 text-sm`}
              >
                Sort by: Courier Name ({sortBy === "az" ? "A–Z" : "Z–A"})
                <ChevronDown
                  size={16}
                  className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>

              {sortOpen && (
                <div
                  className={`absolute right-0 mt-2 w-64 bg-white border ${COLORS.BORDER_DEFAULT} rounded-lg shadow-lg text-sm`}
                >
                  <button
                    onClick={() => {
                      setSortBy("az");
                      setSortOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                  >
                    Sort by: Courier Name (A–Z)
                    {sortBy === "az" && <Check size={16} />}
                  </button>

                  <button
                    onClick={() => {
                      setSortBy("za");
                      setSortOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                  >
                    Sort by: Courier Name (Z–A)
                    {sortBy === "za" && <Check size={16} />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ================= TABLE HEADER ================= */}
          {/* <div className="bg-white rounded-xl p-3"> */}
          <div
            className={`bg-white rounded-xl p-3 border ${COLORS.BORDER_DEFAULT}`}
          >
            <div className="grid grid-cols-[2fr_1fr_1fr_repeat(5,1fr)_1.5fr_0.8fr] text-xs font-semibold text-gray-600 text-center">
              <div className="text-left">Couriers</div>
              <div>Mode</div>
              <div>Min Wt</div>
              <div>Zone A</div>
              <div>Zone B</div>
              <div>Zone C</div>
              <div>Zone D</div>
              <div>Zone E</div>
              <div>COD</div>
              <div>Other</div>
            </div>
          </div>

          {/* ================= DOCUMENT ================= */}
          {activeType === "document" ? (
            <div className="bg-white rounded-xl py-24 flex flex-col items-center text-gray-500">
              <FileText className="w-12 h-12 text-blue-950 mb-4" />
              <p className="text-sm font-medium">
                We could not find any data for the applied filters.
              </p>
              <p className="text-sm">Please change filters and retry.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {couriers.map((courier) => (
                <div
                  key={courier}
                  // className="bg-white rounded-xl overflow-hidden"
                  className={`bg-white rounded-xl overflow-hidden border ${COLORS.BORDER_DEFAULT}`}
                >
                  <button
                    onClick={() => toggleCourierRow(courier)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-blue-50 text-sm"
                  >
                    <span className="font-semibold">{courier}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openCouriers.has(courier) ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openCouriers.has(courier) && (
                    <div className={`divide-y ${COLORS.DIVIDER_DEFAULT}`}>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-[2fr_1fr_1fr_repeat(5,1fr)_1.5fr_0.8fr] px-4 py-3 text-xs text-gray-600 text-center"
                        >
                          <div className="text-left">
                            {courier} Surface {i === 0 ? "500g" : "10kg"}
                          </div>
                          <div>Surface</div>
                          <div>{i === 0 ? "0.5 Kg" : "10 Kg"}</div>
                          <div>₹51</div>
                          <div>₹57</div>
                          <div>₹65</div>
                          <div>₹70</div>
                          <div>₹102</div>
                          <div>₹50 | 1.8%</div>
                          <div>₹0</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ================= REUSABLE DROPDOWN ================= */

function Dropdown({
  label,
  open,
  setOpen,
  items,
  selected,
  setSelected,
}: {
  label: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  items: string[];
  selected: string[];
  setSelected: (v: string[]) => void;
}) {
  const toggle = (item: string) => {
    setSelected(
      selected.includes(item)
        ? selected.filter((v) => v !== item)
        : [...selected, item],
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 bg-white border ${COLORS.BORDER_DEFAULT} rounded-md px-4 py-2 text-sm`}
      >
        {label}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className={`absolute z-50 mt-2 w-56 bg-white border ${COLORS.BORDER_DEFAULT} rounded-lg shadow-lg`}
        >
          <div className="max-h-56 overflow-y-auto p-3 space-y-2 text-sm">
            {items.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.includes(item)}
                  onChange={() => toggle(item)}
                />
                {item}
              </label>
            ))}
          </div>

          <div
            className={`flex justify-between border-t ${COLORS.BORDER_DEFAULT} p-3`}
          >
            <button
              onClick={() => setSelected([])}
              className={`px-4 py-1.5 text-sm border ${COLORS.BORDER_DEFAULT} rounded-md text-blue-600`}
            >
              Clear
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
