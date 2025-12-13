"use client";
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Package,
  Truck,
  Calendar,
  Download,
  Share2,
  Sparkles,
  MapPin,
  Clock,
  CreditCard,
} from "lucide-react";

export default function CartDone() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [orderNumber] = useState(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  const [estimatedDelivery] = useState(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

  const orderItems = [
    {
      id: 1,
      title: "AirPods Pro 2nd Generation",
      brand: "Apple",
      price: 249.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "MacBook Pro 14-inch M3",
      brand: "Apple",
      price: 1599.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center"
    }
  ];

  const orderTotal = 1849.98;

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-gradient-to-br from-[#E6FFFA] via-white to-[#E0F7F5] relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#02AAA0] rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-[#02AAA0] rounded-full blur-2xl opacity-40 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-[#02AAA0] rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>

        {showConfetti && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-[#02AAA0] rounded-full animate-bounce opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-[#02AAA0] rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-[#02AAA0] p-6 rounded-full shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-[#02AAA0] p-2 rounded-full animate-bounce">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-5xl text-clip font-bold bg-gradient-to-r from-[#02AAA0] to-[#02AAA0] bg-clip-text text-transparent mb-4">
            Order Successful! 
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            Thank you for your purchase! Your order has been confirmed and is being processed.
          </p>

          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-[#02AAA0] shadow-lg">
            <div className="w-3 h-3 bg-[#02AAA0] rounded-full animate-pulse"></div>
            <span className="font-semibold text-[#02AAA0]">Order #{orderNumber}</span>
          </div>
        </div>


      </div> 
    </div>
  );
}
