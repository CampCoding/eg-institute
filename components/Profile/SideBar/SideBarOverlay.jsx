"use client";
import React from "react";

const PRIMARY = "#02AAA0";

export default function SideBarOverlay({
  items = [],
  activeRoute = "/profile-settings",
  onNavigate,
}) {
  return (
    <aside className="h-screen top-0 left-0 bottom-0 overflow-y-auto fixed z-10">
      <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 min-h-screen rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {items.map((item) => {
            const isActive = activeRoute === item.route;
            return (
              <li key={item.id}>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.(item.route);
                  }}
                  className={`relative group cursor-pointer flex items-center gap-3 px-5 py-3.5 transition hover:bg-[rgba(2,170,160,0.08)] ${
                    isActive ? "bg-[rgba(2,170,160,0.10)]" : ""
                  }`}
                >
                  {/* Left active rail */}
                  <span
                    className={`absolute ml-[-20px] h-6 w-1 rounded-full ${
                      isActive ? `bg-[${PRIMARY}]` : "bg-transparent"
                    }`}
                    aria-hidden
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

                  {/* Chevron dot */}
                  <span
                    className="ml-auto h-2 w-2 rounded-full opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: PRIMARY }}
                  />
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
