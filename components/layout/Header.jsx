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
import { configs } from "../../libs/configs";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Header = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const ticking = useRef(false);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem("eg_user_data") ??
        sessionStorage.getItem("eg_user_data");
      if (raw) {
        setUserData(JSON.parse(raw));
      }
    } catch (e) {
      console.error("Error parsing user data", e);
    }
  }, []);

  const navigations = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about-us" },
    { name: "Contact us", path: "/contact-us" },
    { name: "Blog", path: "/blogs" },
    { name: "Teachers", path: "/teachers" },
    { name: "Store", path: "/store" },
    { name: "Courses", path: "/courses", hasDropdown: true },
    { name: "Exams", path: "/exams" },
    { name: "Terms", path: "/terms-of-service" },
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

  const logout = () => {
    // اقفل الـdropdown فورًا
    setShowDropdown(false);

    // امسح من الاثنين (لأن login ممكن يكون اختار واحد فيهم)
    localStorage.removeItem(configs.localstorageEgyIntstituteTokenName);
    sessionStorage.removeItem(configs.localstorageEgyIntstituteTokenName);

    localStorage.removeItem("eg_user_data");
    sessionStorage.removeItem("eg_user_data");

    // امسح refresh token cookie
    Cookies.remove(configs.localstorageEgyIntstituteRefreshTokenName, {
      path: "/",
    });

    // لو عندك state محلي ممكن تخليه false، بس الأفضل تعتمد على token existence
    setIsLoggedIn(false);

    // Next navigation أفضل من window.location
    router.replace("/login"); // أو "/"
    router.refresh(); // يحدث server components لو بتستخدمها
  };

  const getAccessToken = () =>
    localStorage.getItem(configs.localstorageEgyIntstituteTokenName) ||
    sessionStorage.getItem(configs.localstorageEgyIntstituteTokenName);

  useEffect(() => {
    setIsLoggedIn(!!getAccessToken());
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
        className={`group flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow duration-200 ${
          isCompact ? "px-2 sm:px-3 py-1.5 text-sm" : "px-2 sm:px-4 py-2"
        }`}
      >
        <div
          className={`bg-white/20 rounded-full flex items-center justify-center ${
            isCompact ? "w-6 h-6" : "w-7 h-7 sm:w-8 sm:h-8"
          }`}
        >
          <User
            className={`${isCompact ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"}`}
          />
        </div>
        <span className="hidden sm:inline text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px]">
          {isLoggedIn ? userData?.student_name : "Account"}
        </span>
        <ChevronDownIcon
          className={`transition-transform duration-200 ${
            showDropdown ? "rotate-180" : ""
          } ${isCompact ? "w-3 h-3" : "w-3 h-3 sm:w-4 sm:h-4"}`}
        />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 sm:w-52 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
          {isLoggedIn ? (
            <>
              <Link
                href={
                  userData?.student_id
                    ? `/profile/${userData.student_id}`
                    : "/profile"
                }
                className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <User2 className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Profile</span>
              </Link>
              <hr className="my-2" />
              <button
                onClick={logout}
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
      onClick={() => {
        if (isLoggedIn) {
          setOpenCart(true);
        } else {
          toast.error("must login in");
        }
      }}
      className={`relative bg-white text-[#02AAA0] shadow-md rounded-full flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-200 cursor-pointer ${
        isCompact ? "w-8 h-8" : "w-10 h-10 sm:w-12 sm:h-12"
      }`}
    >
      <ShoppingCart
        className={`${isCompact ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6"}`}
      />
      <span
        className={`absolute -top-1 -right-1 bg-red-500 text-white font-bold rounded-full flex items-center justify-center ${
          isCompact
            ? "text-[8px] min-w-[14px] h-[14px] px-1"
            : "text-[9px] sm:text-[10px] min-w-[16px] h-4 px-1"
        }`}
      >
        2
      </span>
    </div>
  );

  // Navigation component with courses dropdown
  const NavigationLinks = ({ isCompact = false }) => (
    <div
      className={`hidden xl:flex items-center ${
        isCompact ? "space-x-4 xl:space-x-6" : "space-x-5 xl:space-x-8"
      } font-bold ${isCompact ? "text-sm" : "text-sm xl:text-base"}`}
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
            <Space className="text-gray-700 text-base xl:text-lg whitespace-nowrap hover:text-teal-600 font-medium transition-colors duration-200 relative group cursor-pointer">
              {item.name}
              <ChevronDownIcon className="w-3 h-3" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-200"></span>
            </Space>
          </Dropdown>
        ) : (
          <Link
            key={item.path}
            href={item.path}
            className="text-gray-700 whitespace-nowrap text-base xl:text-lg hover:text-teal-600 font-medium transition-colors duration-200 relative group"
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
        <div className="bg-teal-500 text-white px-3 sm:px-4 md:px-12 py-1.5 sm:py-1 shadow-md border-b border-gray-200/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="flex items-center space-x-1 sm:space-x-2 text-[10px] sm:text-xs">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline sm:inline">Egypt</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 text-[10px] sm:text-xs">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">021270075031+</span>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <div
                  key={index}
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer group"
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main header */}
        <header className="bg-white/80 border-b border-white/20 shadow-lg">
          <nav className="container mx-auto px-3 sm:px-4 md:px-8 py-2 flex justify-between items-center">
            {/* Logo */}
            <div className="w-[60px] sm:w-[70px] md:w-[80px]">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-full h-auto"
              />
            </div>

            {/* Navigation */}
            <NavigationLinks />

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <UserDropdown />
              <CartButton />
              <Menu
                onClick={() => setIsOpen(true)}
                className="text-primary w-7 h-7 sm:w-9 sm:h-9 xl:hidden cursor-pointer hover:scale-110 transition-transform duration-200"
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
        <nav className="container mx-auto px-3 sm:px-4 md:px-8 py-2 flex justify-between items-center">
          {/* Compact Logo */}
          <div className="w-[50px] sm:w-[60px]">
            <img src="/images/logo.png" alt="Logo" className="w-full h-auto" />
          </div>

          {/* Compact Navigation */}
          <NavigationLinks isCompact={true} />

          {/* Compact Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <UserDropdown isCompact={true} />
            <CartButton isCompact={true} />
            <Menu
              onClick={() => setIsOpen(true)}
              className="text-primary w-6 h-6 sm:w-7 sm:h-7 xl:hidden cursor-pointer hover:scale-110 transition-transform duration-200"
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
