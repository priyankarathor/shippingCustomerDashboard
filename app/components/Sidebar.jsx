"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineShoppingCart,
  HiOutlineArrowPath,
  HiOutlineExclamationTriangle,
  HiOutlineBolt,
  HiOutlineScale,
  HiOutlineCog6Tooth,
  HiOutlineWrench,
  HiChevronDown,
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";

export default function Sidebar() {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);

  const isDesktopOpen = hoverOpen;

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {/* ---------------- Mobile Top Bar ---------------- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#040435] text-white flex items-center px-3 z-1000 shadow-md">
        <button onClick={() => setMobileOpen(true)}>
          <HiOutlineBars3 className="text-2xl" />
        </button>
        <span className="ml-4 font-bold text-lg tracking-wide">
          Shiprocket
        </span>
      </div>

      {/* ---------------- Overlay ---------------- */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ---------------- Sidebar ---------------- */}
      <aside
        onMouseEnter={() => setHoverOpen(true)}
        onMouseLeave={() => {
          setHoverOpen(false);
          setOpenMenu(null);
        }}
        className={`
          fixed top-0 left-0 h-screen
          bg-gradient-to-b from-[#1a253c] to-[#06082f]
          text-white z-50
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${isDesktopOpen ? "w-64" : "w-16"}
          flex flex-col
        `}
      >
        {/* ---------------- Logo ---------------- */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          {/* Logo Icon (always visible) */}
          <div className="w-9 h-9 rounded-lg bg-white text-[#040435] font-extrabold flex items-center justify-center">
            S
          </div>

          {/* Logo Text (only when expanded) */}
          {isDesktopOpen && (
            <span className="text-lg font-extrabold tracking-wide">
              Shiprocket
            </span>
          )}

          <button
            className="ml-auto md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <HiOutlineXMark className="text-2xl" />
          </button>
        </div>

        {/* ---------------- Menu ---------------- */}
        <nav className="px-2 py-3 space-y-1 overflow-y-auto flex-1">
          <MenuItem
            icon={<HiOutlineHome />}
            label="Home"
            href="/home"
            open={isDesktopOpen}
            active={pathname === "/home"}
          />

          <MenuItem
            icon={<HiOutlineChartBar />}
            label="Dashboard"
            href="/Darshboard"
            open={isDesktopOpen}
            active={pathname === "/Dashboard"}
          />

          <Dropdown
            icon={<HiOutlineShoppingCart />}
            label="Orders"
            open={openMenu === "orders"}
            sidebarOpen={isDesktopOpen}
            onMouseEnter={() => isDesktopOpen && setOpenMenu("orders")}
            onMouseLeave={() => isDesktopOpen && setOpenMenu(null)}
            onClick={() => toggleMenu("orders")}
          >
            <SubItem
              label="All Orders"
              href="/allorder"
              active={pathname === "/allorder"}
            />
            <SubItem
              label="Create Order"
              href="/order-add"
              active={pathname === "/order-add"}
            />
          </Dropdown>

          <MenuItem
            icon={<HiOutlineArrowPath />}
            label="Returns"
            href="/Return"
            open={isDesktopOpen}
            active={pathname === "/Return"}
          />

          <MenuItem
            icon={<HiOutlineArrowPath />}
            label="Delivery Boost"
            href="/Bootss"
            open={isDesktopOpen}
            active={pathname === "/Bootss"}
          />

          <MenuItem
            icon={<HiOutlineExclamationTriangle />}
            label="NDR"
            href="/ndr"
            badge="!"
            open={isDesktopOpen}
            active={pathname === "/ndr"}
          />

          <MenuItem
            icon={<HiOutlineBolt />}
            label="Quick Delivery"
            href="/quick-delivery"
            open={isDesktopOpen}
            active={pathname === "/quick-delivery"}
          />

          <Dropdown
            icon={<HiOutlineScale />}
            label="Weight"
            open={openMenu === "weight"}
            sidebarOpen={isDesktopOpen}
            onMouseEnter={() => isDesktopOpen && setOpenMenu("weight")}
            onMouseLeave={() => isDesktopOpen && setOpenMenu(null)}
            onClick={() => toggleMenu("weight")}
          >
            <SubItem
              label="Weight Discrepancy"
              href="/WeightManagement/WeightDiscrepancy"
              active={pathname.includes("WeightDiscrepancy")}
            />
            <SubItem label="Weight Freeze" href="/weight/freeze" />
            <SubItem label="All Shipments" href="/weight/all-shipments" />
          </Dropdown>

          <MenuItem
            icon={<HiOutlineBolt />}
            label="Help & Support"
            href="/help-support"
            open={isDesktopOpen}
            active={pathname === "/help-support"}
          />
        </nav>
      </aside>
    </>
  );
}

/* ---------------- Components ---------------- */

function MenuItem({ icon, label, badge, open, href, active }) {
  return (
    <Link
      href={href}
      className={`sidebar-link font-semibold
        ${active ? "bg-white text-[#040435]" : ""}
      `}
    >
      <span className="text-xl">{icon}</span>
      {open && <span className="text-sm font-bold">{label}</span>}
      {badge && open && (
        <span className="ml-auto bg-yellow-400 text-black text-xs px-2 rounded-full font-bold">
          {badge}
        </span>
      )}
    </Link>
  );
}

function Dropdown({
  icon,
  label,
  open,
  sidebarOpen,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children,
}) {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        onClick={onClick}
        className="sidebar-link w-full justify-start font-semibold"
      >
        <span className="text-xl">{icon}</span>
        {sidebarOpen && (
          <>
            <span className="text-sm font-bold">{label}</span>
            <HiChevronDown
              className={`ml-auto transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {open && sidebarOpen && <div className="ml-8 space-y-1">{children}</div>}
    </div>
  );
}

function SubItem({ label, href, active }) {
  return (
    <Link
      href={href}
      className={`sidebar-subitem font-medium
        ${active ? "bg-white text-[#040435]" : ""}
      `}
    >
      {label}
    </Link>
  );
}
