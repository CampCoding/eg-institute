"use client";
import React, { useMemo, useState, useEffect } from "react";
import SideBar from "@/components/Profile/SideBar/SideBar";
import ProfileContent from "@/components/Profile/ProfileContent/ProfileContent";
import {
  AlignJustify,
  Bell,
  CalendarFold,
  LibraryBig,
  LogOut,
  Package,
  PictureInPicture,
  ShoppingBasket,
  User,
  Video,
} from "lucide-react";

export const items = [
  { id: 1, title: "Profile Settings", icon: <User />, route: "/profile-settings" },
  { id: 2, title: "Notifications", icon: <Bell />, route: "/notifications" },
  { id: 3, title: "My Courses", icon: <LibraryBig />, route: "/user-courses" },
  { id: 4, title: "Videos", icon: <Video />, route: "/videos" },
  { id: 5, title: "Lives", icon: <PictureInPicture />, route: "/lives" },
  { id: 6, title: "Reservations", icon: <CalendarFold />, route: "/my-reservation" },
  { id: 7, title: "Orders", icon: <Package />, route: "/my-orders" },
  { id: 8, title: "My purchases", icon: <ShoppingBasket />, route: "/my-purchases" },
  { id: 9, title: "Logout", icon: <LogOut />, route: "/" },
];

export default function ProfilePage() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/profile-settings");
  const [isMobile, setIsMobile] = useState(false);

  const activeItem = useMemo(() => {
    return items.find((i) => i.route === activeRoute) || items[0];
  }, [activeRoute]);

  // Detect if mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Mobile menu toggle */}
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
        {/* Sidebar */}
        <SideBar
          items={items}
          activeRoute={activeRoute}
          onNavigate={setActiveRoute}
          isMobile={isMobile}
          open={openSideBar}
          onClose={() => setOpenSideBar(false)}
        />

        {/* Main Content */}
        <ProfileContent route={activeRoute} title={activeItem.title} />
      </div>
    </div>
  );
}
