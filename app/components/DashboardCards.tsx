"use client";
import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";

export function DashboardCards() {
  const cards = [
    {
      title: "25% Cashback on min recharge of INR200",
      desc: "Kickstart Your Shipping Journey with Our Special Offers!",
    },
    {
      title: "Complete your KYC",
      desc: "Complete your KYC verification to start shipping orders",
    },
    {
      title: "Ship Orders",
      desc: "Select a courier of your choice and schedule a pickup when ready.",
    },
    {
      title: "25% Cashback on min recharge of INR200",
      desc: "Kickstart Your Shipping Journey with Our Special Offers!",
    },
    {
      title: "Complete your KYC",
      desc: "Complete your KYC verification to start shipping orders",
    },
    {
      title: "Ship Orders",
      desc: "Select a courier of your choice and schedule a pickup when ready.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full justify-start items-start">
      {cards.map((card, index) => (
        <div
          key={index}
          className="h-50 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg"
        >
          <div
            className="absolute inset-0 bg-slate-900 z-20
        [mask-image:radial-gradient(transparent,white)] pointer-events-none"
          />

          <Boxes />

          <h3 className="text-xl md:text-lg text-white relative z-20 text-center">
            {card.title}
          </h3>

          <p className="text-center mt-2 text-neutral-300 relative z-20 px-4">
            {card.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
