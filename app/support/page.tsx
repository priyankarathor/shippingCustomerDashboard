"use client";

import { useState } from "react";
import {
  Search,
  GraduationCap,
  Sparkles,
  Ticket,
  Wrench,
  MessageCircleQuestion,
  BadgeCheck,
  AlertCircle,
  Clock,
  Timer,
} from "lucide-react";

import Open from "./Open";
import AwaitingResponse from "./AwaitingResponse";
import Closed from "./Closed";

const tabs = ["Open", "Awaiting Response", "Closed"];

const overviewCards = [
  {
    label: "Open Tickets",
    value: "0",
    icon: Ticket,
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    label: "Work in progress Tickets",
    value: "0",
    icon: Wrench,
    bg: "bg-orange-50",
    color: "text-orange-600",
  },
  {
    label: "Tickets on response awaited from you",
    value: "0",
    icon: MessageCircleQuestion,
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    label: "Tickets resolved within SLA",
    value: "0",
    icon: BadgeCheck,
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    label: "Overdue tickets",
    value: "0",
    icon: AlertCircle,
    bg: "bg-red-50",
    color: "text-red-600",
  },
  {
    label: "Tickets due to be resolved today",
    value: "0",
    icon: Clock,
    bg: "bg-pink-50",
    color: "text-pink-600",
  },
  {
    label: "Avg resolution time",
    value: "0h 0m",
    icon: Timer,
    bg: "bg-teal-50",
    color: "text-teal-600",
  },
];

export default function HelpSupportPage() {
  const [activeTab, setActiveTab] = useState("Open");

  return (
    <div className="min-h-screen bg-[#f8f9fb] px-8 py-6 space-y-6 mt-10">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Support</h1>
          <p className="text-sm text-gray-500">
            Get help by creating a ticket or reading help articles
          </p>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
          Create Ticket
        </button>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-5 flex gap-4 items-center">
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <GraduationCap className="text-blue-600" size={20} />
          </div>
          <span className="text-blue-600 font-medium text-sm">
            Register for Training
          </span>
        </div>

        <div className="bg-white rounded-xl border p-5 flex gap-4 items-center opacity-60">
          <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Sparkles className="text-gray-500" size={18} />
          </div>
          <span className="text-gray-500 font-medium text-sm">Ask Copilot</span>
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="bg-white rounded-xl border p-6 space-y-5">
        <h3 className="text-sm font-medium text-gray-700">
          Last 30-Days Data Overview
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {overviewCards.map((c) => (
            <div
              key={c.label}
              className="border rounded-lg p-4 flex justify-between"
            >
              <div className="flex gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center ${c.bg}`}
                >
                  <c.icon className={c.color} size={18} />
                </div>
                <p className="text-sm text-gray-600 max-w-[150px]">{c.label}</p>
              </div>
              <span className="font-semibold">{c.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative w-[420px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          placeholder="Search by Ticket ID, AWB, Pickup ID"
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white text-sm"
        />
      </div>

      {/* TABS */}
      <div className="flex gap-10 border-b">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`pb-3 text-sm font-medium ${
              activeTab === t
                ? "text-blue-600 border-b-[3px] border-blue-600"
                : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "Open" && <Open />}
      {activeTab === "Awaiting Response" && <AwaitingResponse />}
      {activeTab === "Closed" && <Closed />}
    </div>
  );
}
