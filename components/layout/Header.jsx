"use client";
import React, { useEffect, useState } from "react";
import {
  Facebook, Instagram, Twitter, Youtube, Phone, MapPin, BookOpen,
  Menu, User, UserPlus, LogIn, Settings, User2, ShoppingCart, ChevronDown as ChevronDownIcon,
} from "lucide-react";
import Link from "next/link";
import SideNav from "./Sidenav";
import ShoppingCartDrawer from "../cart/Cart";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const navigations = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about-us" },
    { name: "Contact us", path: "/contact-us" },
    { name: "Blog", path: "/blogs" },
    { name: "Teachers", path: "/teachers" },
    { name: "Store", path: "/store" },
    { name: "Courses", path: "/courses" },
    { name: "Exams", path: "/exams" },
  ];

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("egy-user") ? JSON.parse(localStorage.getItem("egy-user")) : null)
  } , [])

  useEffect(() => {
    const handleScroll = () => setShowStickyHeader(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const UserDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="group flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
      >
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <span className="hidden md:inline">{isLoggedIn ? "John Doe" : "Account"}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`} />
      </button>
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                <User2 className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Profile</span>
              </Link>
              <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                <BookOpen className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">My Courses</span>
              </Link>
              <Link href="/settings" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Settings</span>
              </Link>
              <hr className="my-2" />
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full text-left flex items-center space-x-3 px-4 py-2 hover:bg-red-50 transition-colors text-red-600"
              >
                <LogIn className="w-4 h-4 rotate-180" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                <UserPlus className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Login</span>
              </Link>
              <Link href="/register" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                <LogIn className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Register</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Top bar */}
      <div className="bg-teal-500 text-white px-4 md:px-12 shadow-md relative overflow-hidden flex justify-between items-center py-3 text-sm border-b border-gray-200/50">
        <div className="flex items-center text-base md:text-xl space-x-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Egypt</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>021270075031+</span>
          </div>
        </div>
        <div className="space-x-3 hidden md:flex z-40">
          {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
            <div key={index} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group">
              <Icon className="w-6 h-6 text-primary group-hover:animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 left-0 w-full z-[9999] transition-all">
        <nav className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="w-[80px]">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <div className="hidden lg:flex items-center space-x-8 font-bold text-[calc(10px+0.5vw)]">
            {navigations.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-gray-700 whitespace-nowrap hover:text-teal-600 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <UserDropdown />
            <div
              onClick={() => setOpenCart(true)}
              className="relative w-10 h-10 bg-white text-[#02AAA0] shadow-md rounded-full flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all cursor-pointer group"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5">2</span>
            </div>
            <Menu onClick={() => setIsOpen(true)} className="text-primary w-9 h-9 lg:hidden cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </nav>
      </header>

      {/* Side navigation and cart drawer */}
      <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />
      {openCart && <ShoppingCartDrawer openCart={openCart} onClose={() => setOpenCart(false)} />}
    </>
  );
};

export default Header;
