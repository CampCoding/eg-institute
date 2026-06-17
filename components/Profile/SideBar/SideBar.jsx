"use client";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { configs } from "../../../libs/configs";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const PRIMARY = "#02AAA0";

export default function SideBar({
  items = [],
  activeRoute = "/profile-settings",
  onNavigate,
  isMobile = false,
  open = false,
  onClose,
}) {
  const dispatch = useDispatch();
  const sidebarClasses = isMobile
    ? `fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-teal-50 via-white to-blue-50 z-[9999] transform transition-transform duration-300 overflow-y-auto ${
        open ? "translate-x-0" : "-translate-x-full"
      }`
    : "bg-gradient-to-br from-teal-50 via-white to-blue-50 min-h-screen rounded-2xl shadow-xl ring-1 ring-black/5 overflow-y-auto";

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/30 !z-[9998]"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <ul className="divide-y divide-gray-100 pt-4 pb-6">
          {items.map((item) => {
            const isActive = activeRoute === item.route;
            if (isActive && item.title === "Logout") {
              localStorage.removeItem(
                configs.localstorageEgyIntstituteTokenName
              );
              localStorage.removeItem("eg_user_data");
              sessionStorage.removeItem(
                configs.localstorageEgyIntstituteTokenName
              );
              sessionStorage.removeItem("eg_user_data");
              Cookies.remove(configs.localstorageEgyIntstituteRefreshTokenName);
              toast.success("Logout Successfully");
              window.location.href = "/";
            }
            return (
              <li key={item.id}>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.(item.route);
                    localStorage.setItem("profile_active_route", item.route);

                    if (isMobile) onClose?.();
                  }}
                  className={`relative group cursor-pointer flex items-center gap-3 px-5 py-3.5 transition
                    hover:bg-[rgba(2,170,160,0.08)]
                    ${isActive ? "bg-[rgba(2,170,160,0.10)]" : ""}`}
                >
                  {/* Active rail */}
                  <span
                    className={`absolute ml-[-20px] h-6 w-1 rounded-full ${
                      isActive ? `bg-[${PRIMARY}]` : "bg-transparent"
                    }`}
                  />
                  {/* Icon */}
                  <span
                    className="grid place-items-center h-9 w-9 rounded-xl ring-1 ring-black/5 bg-white shadow group-hover:scale-105"
                    style={{ color: PRIMARY }}
                  >
                    <span className="[&>*]:h-5 [&>*]:w-5">{item.icon}</span>
                  </span>
                  {/* Label */}
                  <span className="text-sm font-medium text-[#111827]">
                    {item.title}
                  </span>
                  {/* Dot */}
                  <span
                    className="ml-auto h-2 w-2 rounded-full opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: PRIMARY }}
                  />
                </p>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
