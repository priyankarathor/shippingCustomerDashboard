"use client";

import {
  User,
  FileText,
  Gift,
  ThumbsUp,
  ScrollText,
  Keyboard,
  LogOut,
} from "lucide-react";

type ProfilePopupProps = {
  open: boolean;
};

export default function ProfilePopup({ open }: ProfilePopupProps) {
  if (!open) return null;

  return (
    <div className="absolute right-0 top-12 w-56 bg-white border rounded-xl shadow-lg z-50">
      <ul className="py-2 text-sm text-gray-700">
        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <User className="w-4 h-4" />
          Seller
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <FileText className="w-4 h-4" />
          Current Plan
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <Gift className="w-4 h-4" />
          Refer & Earn
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <ThumbsUp className="w-4 h-4" />
          Rate Us
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <ScrollText className="w-4 h-4" />
          Terms & Conditions
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <Keyboard className="w-4 h-4" />
          Keyboard Shortcuts
        </li>

        <li className="border-t mt-2">
          <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer text-red-600">
            <LogOut className="w-4 h-4" />
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
}
