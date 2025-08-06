"use client";

import React, { useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  MapPin,
  ChevronDown,
  BookOpen,
  Menu,
  User,
  UserPlus,
  LogIn,
  Settings,
  ChevronDown as ChevronDownIcon,
  User2,
  ShoppingCart,
} from "lucide-react";
import SideNav from "./Sidenav";
import Link from "next/link";
import cx from "classnames";
import { useRouter } from "next/navigation";
import ShoppingCartDrawer from "../cart/Cart";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const [showNav, setShowNav] = React.useState(false);
  const [openCart ,setOpenCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const AuthButtons = () => (
    <div className="flex items-center gap-3">
      <Link href="/login">
        <button className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#02AAA0] to-cyan-500 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group">
          <UserPlus className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline">Login</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity duration-300"></div>
        </button>
      </Link>
      <div
        onClick={() => router.push("/profile/1")}
        title="My Profile"
        className="relative w-10 h-10 bg-white text-[#02AAA0] shadow-md rounded-full flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all cursor-pointer group"
      >
        <User2 className="w-5 h-5 group-hover:animate-pulse" />
      </div>
      <div
  onClick={() => setOpenCart(true)}
  title="Your Cart"
  className="relative w-10 h-10 bg-white text-[#02AAA0] shadow-md rounded-full flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all cursor-pointer group"
>
  <ShoppingCart className="w-5 h-5" />
  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5">2</span>
</div>

    </div>
  );

  const UserDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="group flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
      >
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <span className="hidden md:inline">John Doe</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`} />
      </button>
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
          <Link href="/profile" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors">
            <User className="w-4 h-4 text-gray-600" />
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
        </div>
      )}
    </div>
  );

 

  return (
    <>
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="">
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
            <div className="space-x-3 hidden md:flex relative z-40">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <div key={index} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group">
                  <Icon className="w-6 h-6 text-primary group-hover:animate-pulse" />
                </div>
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-teal-400 rounded-l-full opacity-60">
              <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-dashed border-white rounded-full"></div>
            </div>
          </div>

          <nav className="container px-3 lg:px-6 mx-auto flex justify-between items-center gap-7 py-4">
            <div className="w-[80px] md:ml-10">
              <img src="/images/logo.png" alt="Logo" />
            </div>
            <div className="hidden md:flex items-center space-x-8 text-[calc(10px+0.5vw)] font-bold">
              {navigations.map((item, i) => (
                <Link
                  key={i}
                  href={item.path}
                  className="text-gray-700 whitespace-nowrap hover:text-teal-600 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              {isLoggedIn ? <UserDropdown /> : <AuthButtons />}
              <Menu onClick={() => setIsOpen(!isOpen)} className="text-primary w-9 h-9 md:hidden cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </nav>
        </div>
      </header>

      <header className={cx("z-10 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg !fixed left-0 w-full transition-all duration-300 z-[9999]", showNav ? "!top-0" : "top-[-300px]")}> 
        <nav className="container bg-white w-full px-3 lg:px-6 mx-auto flex justify-between items-center gap-7 py-4">
          <div className="w-[80px] md:ml-10">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <div className="hidden md:flex items-center space-x-8 text-[calc(10px+0.5vw)] font-bold">
            {navigations.map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className="text-gray-700 whitespace-nowrap hover:text-teal-600 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            {isLoggedIn ? <UserDropdown /> : <AuthButtons />}
            <Menu onClick={() => setIsOpen(!isOpen)} className="text-primary w-9 h-9 md:hidden cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </nav>
      </header>

      <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />

    {openCart &&  <ShoppingCartDrawer openCart={openCart} onClose={() => setOpenCart(false)}/> }
    </>
  );
};

export default Header;
