"use client";
import React, { useMemo, useState, useEffect } from "react";
import SideBar from "@/components/Profile/SideBar/SideBar";
import ProfileContent from "@/components/Profile/ProfileContent/ProfileContent";
import {
  AlignJustify,
  Bell,
  Calendar,
  CalendarFold,
  LibraryBig,
  LogOut,
  Package,
  PictureInPicture,
  ShoppingBasket,
  User,
  Video,
  PenTool,
} from "lucide-react";

export const items = [
  {
    id: 1,
    title: "Profile Settings",
    icon: <User />,
    route: "/profile-settings",
  },
  { id: 2, title: "Notifications", icon: <Bell />, route: "/notifications" },
  { id: 3, title: "My Courses", icon: <LibraryBig />, route: "/user-courses" },
  { id: 4, title: "My Schedule", icon: <Calendar />, route: "/schedule" },
  { id: 11, title: "Exams", icon: <PenTool />, route: "/exams" },
  {
    id: 7,
    title: "Reservations",
    icon: <CalendarFold />,
    route: "/my-reservation",
  },
  { id: 8, title: "Orders", icon: <Package />, route: "/my-orders" },
  {
    id: 9,
    title: "My purchases",
    icon: <ShoppingBasket />,
    route: "/my-purchases",
  },
  { id: 10, title: "Logout", icon: <LogOut />, route: "/" },
];

export default function ProfilePage() {
  // Initialize from localStorage if available
  const [activeRoute, setActiveRoute] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("profile_active_route") || "/profile-settings"
      );
    }
    return "/profile-settings";
  });
  const [openSideBar, setOpenSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ persist active tab whenever it changes
  useEffect(() => {
    localStorage.setItem("profile_active_route", activeRoute);
  }, [activeRoute]);

  // Detect if mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeItem = useMemo(() => {
    return items.find((i) => i.route === activeRoute) || items[0];
  }, [activeRoute]);
  return (
    <div className="relative">
      {isMobile && (
        <div className="m-4">
          <button
            onClick={() => setOpenSideBar(true)}
            className="bg-white flex items-center justify-center rounded-xl p-3 shadow-lg"
          >
            <AlignJustify size={24} color="#02AAA0" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] mt-5 gap-6 px-4 md:px-10 pb-10">
        <SideBar
          items={items}
          activeRoute={activeRoute}
          onNavigate={(route) => {
            setActiveRoute(route);
            if (isMobile) setOpenSideBar(false);
          }}
          isMobile={isMobile}
          open={openSideBar}
          onClose={() => setOpenSideBar(false)}
        />

        <ProfileContent route={activeRoute} title={activeItem.title} />
      </div>
    </div>
  );
}
