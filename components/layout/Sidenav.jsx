import { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  Settings,
  MessageCircle,
  Bell,
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Phone,
  Pencil,
  GraduationCap,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  BookOpenCheck,
  User,
  Store,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav({ isOpen, setIsOpen }) {
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const menuItems = [
    {
      id: "Home",
      label: "Home",
      path: "/",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "About Us",
      label: "About Us",
      path: "/about-us",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "Contact Us",
      label: "Contact Us",
      path: "/contact-us",
      icon: Phone,
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "Blog",
      label: "Blog",
      icon: Pencil,
      color: "from-orange-500 to-red-500",
      path: "/blogs",
    },
    {
      id: "Teachers",
      label: "Teachers",
      icon: User,
      color: "from-pink-500 to-rose-500",
      path: "/teachers",
    },
    {
      id: "Store",
      label: "Store",
      icon: Store,
      color: "from-indigo-500 to-purple-500",
      path: "/store",
    },
    {
      id: "Courses",
      label: "Courses",
      icon: GraduationCap,
      color: "from-teal-500 to-cyan-500",
      hasSubmenu: true,
      // No path here since it has submenu
      submenu: [
        {
          id: "AllCourses",
          label: "All Courses",
          path: "/courses",
          icon: BookOpen,
        },
        // {
        //   id: "LiveCourses",
        //   label: "Live Courses",
        //   path: "/live-courses",
        //   icon: Video,
        // },
      ],
    },
    {
      id: "Exams",
      label: "Exams",
      icon: BookOpenCheck,
      color: "from-emerald-500 to-teal-500",
      path: "/exams",
    },
  ];

  const bottomItems = [
    { id: "messages", label: "Messages", icon: MessageCircle, badge: "5" },
    { id: "notifications", label: "Notifications", icon: Bell, badge: "2" },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    const currentPath = pathname;
    let activeMenuItem = null;

    // Check main items first (only those without submenu)
    activeMenuItem = menuItems.find(
      (item) => item.path === currentPath && !item.hasSubmenu
    );

    // If not found, check submenu items
    if (!activeMenuItem) {
      for (const item of menuItems) {
        if (item.submenu) {
          const submenuItem = item.submenu.find(
            (sub) => sub.path === currentPath
          );
          if (submenuItem) {
            activeMenuItem = submenuItem;
            // Expand the parent item
            setExpandedItems((prev) => ({ ...prev, [item.id]: true }));
            break;
          }
        }
      }
    }

    if (activeMenuItem) {
      setActiveItem(activeMenuItem.id);
    } else {
      setActiveItem("Home");
    }
  }, [pathname]);

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      // Only toggle expansion, don't navigate
      toggleExpanded(item.id);
    } else {
      // Navigate and close sidebar
      setActiveItem(item.id);
      setIsOpen(false);
    }
  };

  const handleSubmenuClick = (submenuItem, parentId) => {
    setActiveItem(submenuItem.id);
    setIsOpen(false);
  };

  // Render a menu item (either clickable or non-clickable based on hasSubmenu)
  const renderMenuItem = (item, index) => {
    const isActive =
      activeItem === item.id ||
      (item.submenu && item.submenu.some((sub) => sub.id === activeItem));

    const menuItemContent = (
      <div
        className={`relative group transition-all duration-300 transform hover:scale-105 ${
          isActive ? "scale-105" : ""
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-r-full animate-pulse"></div>
        )}

        <div
          className={`relative flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-400/30"
              : "hover:bg-slate-800 border border-transparent"
          }`}
          onClick={() => handleItemClick(item)}
        >
          {/* Icon with gradient background */}
          <div
            className={`relative p-3 rounded-xl bg-gradient-to-r ${
              item.color
            } shadow-lg group-hover:shadow-xl transition-all duration-300 ${
              hoveredItem === item.id ? "scale-110" : ""
            }`}
          >
            <item.icon className="w-5 h-5 text-white" />
            {item.badge && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-bounce">
                {item.badge}
              </div>
            )}
          </div>

          {isOpen && (
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-primary group-hover:text-teal-300"
                  }`}
                >
                  {item.label}
                </span>
                {item.hasSubmenu ? (
                  <ChevronDown
                    className={`w-4 h-4 text-teal-400 transition-transform duration-200 ${
                      expandedItems[item.id] ? "rotate-180" : ""
                    }`}
                  />
                ) : (
                  hoveredItem === item.id && (
                    <ChevronRight className="w-4 h-4 text-teal-400 animate-pulse" />
                  )
                )}
              </div>
            </div>
          )}

          {/* Hover effect */}
          {hoveredItem === item.id && (
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-2xl animate-pulse"></div>
          )}
        </div>
      </div>
    );

    // If item has submenu, don't wrap in Link
    if (item.hasSubmenu) {
      return menuItemContent;
    }

    // If item doesn't have submenu, wrap in Link for navigation
    return (
      <Link href={item.path} key={item.id}>
        {menuItemContent}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed z-[9999] inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <nav
        className={`fixed left-0 top-0 h-full bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-100 z-[999999] transition-all duration-500 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isOpen ? "w-80" : "w-20"} shadow-2xl`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 text-6xl text-teal-400 animate-pulse">
            عربي
          </div>
          <div className="absolute bottom-40 left-10 text-4xl text-cyan-400 animate-bounce delay-1000">
            لغة
          </div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-700 bg-white">
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center justify-between w-full">
                <img src="/images/logo.png" className="w-[50px]" alt="" />
                <X
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer hover:text-red-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Main Menu */}
          <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <div key={item.id}>
                  {/* Main Item */}
                  {renderMenuItem(item, index)}

                  {/* Submenu */}
                  {item.hasSubmenu && expandedItems[item.id] && isOpen && (
                    <div className="ml-6 mt-2 space-y-1 animate-slideDown">
                      {item.submenu.map((submenuItem) => (
                        <Link
                          key={submenuItem.id}
                          href={submenuItem.path}
                          onClick={() =>
                            handleSubmenuClick(submenuItem, item.id)
                          }
                          className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-300 group ${
                            activeItem === submenuItem.id
                              ? "bg-gradient-to-r from-teal-500/15 to-cyan-500/15 border border-teal-400/20"
                              : "hover:bg-teal-500/10 border border-transparent"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-md group-hover:shadow-lg transition-all duration-300`}
                          >
                            <submenuItem.icon className="w-4 h-4 text-white" />
                          </div>
                          <span
                            className={`ml-3 font-medium transition-colors duration-300 ${
                              activeItem === submenuItem.id
                                ? "text-teal-600"
                                : "text-gray-700 group-hover:text-teal-500"
                            }`}
                          >
                            {submenuItem.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Menu */}
          {isOpen && (
            <div className="p-4 border-t border-slate-700">
              <div className="space-x-3 flex items-center justify-between">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                  <div
                    key={index}
                    className="w-11 h-11 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group"
                  >
                    <Icon className="w-4 h-4 text-white group-hover:animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        @font-face {
          font-family: "Arabic";
          src: url("https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap");
        }
        .font-arabic {
          font-family: "Amiri", serif;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
