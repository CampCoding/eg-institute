"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  MapPin,
  Menu,
  User,
  UserPlus,
  LogIn,
  User2,
  ShoppingCart,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import Link from "next/link";
import SideNav from "./Sidenav";
import ShoppingCartDrawer from "../cart/Cart";
import { useRouter } from "next/navigation";
import { Dropdown, Space } from "antd";

const Header = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const ticking = useRef(false);

  const navigations = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about-us" },
    { name: "Contact us", path: "/contact-us" },
    { name: "Blog", path: "/blogs" },
    { name: "Teachers", path: "/teachers" },
    { name: "Store", path: "/store" },
    { name: "Courses", path: "/courses", hasDropdown: true },
    { name: "Exams", path: "/exams" },
  ];

  // Courses dropdown menu items
  const coursesMenuItems = [
    {
      key: "1",
      label: (
        <Link
          href="/courses"
          className="flex items-center py-2 px-1 hover:text-teal-600 transition-colors text-[13px]"
        >
          <span>All Courses</span>
        </Link>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <Link
    //       href="/live-courses"
    //       className="flex items-center py-2 px-1 hover:text-teal-600 transition-colors text-[13px]"
    //     >
    //       <span>Live Courses</span>
    //     </Link>
    //   ),
    // },
  ];

  useEffect(() => {
    setIsLoggedIn(
      localStorage.getItem("egy-user")
        ? JSON.parse(localStorage.getItem("egy-user"))
        : null
    );
  }, []);

  // Scroll handler for 100px trigger
  useEffect(() => {
    const updateScrollState = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsScrolled(scrollTop > 100);
      ticking.current = false;
    };

    const requestTick = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    const handleScroll = () => requestTick();

    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const UserDropdown = ({ isCompact = false }) => (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`group flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow duration-200 ${
          isCompact ? "px-3 py-1.5 text-sm" : "px-4 py-2"
        }`}
      >
        <div
          className={`bg-white/20 rounded-full flex items-center justify-center ${
            isCompact ? "w-6 h-6" : "w-8 h-8"
          }`}
        >
          <User className={`${isCompact ? "w-4 h-4" : "w-5 h-5"}`} />
        </div>
        <span className="hidden md:inline">
          {isLoggedIn ? "John Doe" : "Account"}
        </span>
        <ChevronDownIcon
          className={`transition-transform duration-200 ${
            showDropdown ? "rotate-180" : ""
          } ${isCompact ? "w-3 h-3" : "w-4 h-4"}`}
        />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile/2"
                className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <User2 className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Profile</span>
              </Link>
              <hr className="my-2" />
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setShowDropdown(false);
                  localStorage.removeItem("egy-user");
                  window.location.href = "/";
                }}
                className="w-full text-left flex items-center space-x-3 px-4 py-2 hover:bg-red-50 transition-colors text-red-600"
              >
                <LogIn className="w-4 h-4 rotate-180" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <UserPlus className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <LogIn className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Register</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );

  const CartButton = ({ isCompact = false }) => (
    <div
      onClick={() => setOpenCart(true)}
      className={`relative bg-white text-[#02AAA0] shadow-md rounded-full flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-200 cursor-pointer ${
        isCompact ? "w-8 h-8" : "w-12 h-12"
      }`}
    >
      <ShoppingCart className={`${isCompact ? "w-4 h-4" : "w-8 h-8"}`} />
      <span
        className={`absolute -top-1 -right-1 bg-red-500 text-white font-bold rounded-full px-1 flex items-center justify-center ${
          isCompact
            ? "text-[8px] min-w-[14px] h-[14px]"
            : "text-[10px] min-w-[16px] h-4"
        }`}
      >
        2
      </span>
    </div>
  );

  // Navigation component with courses dropdown
  const NavigationLinks = ({ isCompact = false }) => (
    <div
      className={`hidden lg:flex items-center ${
        isCompact ? "space-x-8" : "space-x-10"
      } font-bold ${isCompact ? "text-sm" : "text-base"}`}
    >
      {navigations.map((item) =>
        item.hasDropdown ? (
          <Dropdown
            key={item.path}
            menu={{ items: coursesMenuItems }}
            trigger={["hover"]}
            placement="bottomCenter"
            overlayClassName="courses-dropdown"
          >
            <Space className="text-gray-700 text-xl whitespace-nowrap hover:text-teal-600 font-medium transition-colors duration-200 relative group cursor-pointer">
              {item.name}
              <ChevronDownIcon className="w-3 h-3" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-200"></span>
            </Space>
          </Dropdown>
        ) : (
          <Link
            key={item.path}
            href={item.path}
            className="text-gray-700 whitespace-nowrap text-xl hover:text-teal-600 font-medium transition-colors duration-200 relative group"
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-200"></span>
          </Link>
        )
      )}
    </div>
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".relative")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      {/* Custom CSS for dropdown */}
      <style jsx global>{`
        .courses-dropdown .ant-dropdown-menu {
          border-radius: 12px;
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          padding: 8px;
          min-width: 180px;
        }

        .courses-dropdown .ant-dropdown-menu-item {
          border-radius: 8px;
          margin: 2px 0;
          padding: 8px 12px;
          transition: all 0.2s ease;
        }

        .courses-dropdown .ant-dropdown-menu-item:hover {
          background-color: #f0fdfa;
          color: #0d9488;
        }
      `}</style>

      {/* Original Header (Normal Size) */}
      <div className="relative">
        {/* Top bar */}
        <div className="bg-teal-500 text-white px-4 md:px-12 py-1 shadow-md border-b border-gray-200/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-xs">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Egypt</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">021270075031+</span>
              </div>
            </div>
            <div className="space-x-3 hidden md:flex">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer group"
                >
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main header */}
        <header className="bg-white/80 border-b border-white/20 shadow-lg">
          <nav className="container mx-auto px-4 md:px-8 py-2 flex justify-between items-center">
            {/* Logo */}
            <div className="w-[80px]">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-full h-auto"
              />
            </div>

            {/* Navigation */}
            <NavigationLinks />

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <UserDropdown />
              <CartButton />
              <Menu
                onClick={() => setIsOpen(true)}
                className="text-primary w-9 h-9 lg:hidden cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            </div>
          </nav>
        </header>
      </div>

      {/* Compact Header (Appears after 100px scroll) */}
      <header
        className={`fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-b border-white/20 z-[999] transition-all duration-300 ease-in-out ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 md:px-8 py-2 flex justify-between items-center">
          {/* Compact Logo */}
          <div className="w-[60px]">
            <img src="/images/logo.png" alt="Logo" className="w-full h-auto" />
          </div>

          {/* Compact Navigation */}
          <NavigationLinks isCompact={true} />

          {/* Compact Actions */}
          <div className="flex items-center space-x-2">
            <UserDropdown isCompact={true} />
            <CartButton isCompact={true} />
            <Menu
              onClick={() => setIsOpen(true)}
              className="text-primary w-7 h-7 lg:hidden cursor-pointer hover:scale-110 transition-transform duration-200"
            />
          </div>
        </nav>
      </header>

      {/* Side navigation and cart drawer */}
      <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />
      {openCart && (
        <ShoppingCartDrawer
          openCart={openCart}
          onClose={() => setOpenCart(false)}
        />
      )}
    </>
  );
};

export default Header;
