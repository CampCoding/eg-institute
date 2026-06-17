"use client";
import React, { useEffect } from "react";
import { X, CreditCard, Lock, CalendarClock, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentDrawer({ isOpen,savings, cartItems ,setCurrentStep ,total, totalItems , subtotal , shipping , tax}) {
  const router =useRouter();
  // useEffect(() => {
  //   document.body.style.overflowY = isOpen ? "hidden" : "auto";
  // }, [isOpen]);

  // if (!isOpen) return null;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {cartItems.length > 0 && (
          <div className="bg-gradient-to-t from-white via-gray-50 to-transparent px-6 py-6">
            {/* Order Summary */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                Order Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span className="font-semibold">-${savings.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                className="w-full bg-gradient-to-r from-[#02AAA0] via-[#00C2BA] to-[#02AAA0] text-white font-bold py-5 rounded-3xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-purple-500/25 text-lg tracking-wide relative overflow-hidden group"
                onClick={() => alert("Checkout coming soon!")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div 
                onClick={() => setCurrentStep(2)}
                className="relative flex items-center justify-center gap-3">
                  <ShoppingBag className="w-6 h-6" />
                  Secure Checkout
                  <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    →
                  </div>
                </div>
              </button>

              <button
                onClick={() => router.push("/store")}
                className="w-full text-gray-600 hover:text-primary font-semibold py-4 text-lg transition-all duration-300 hover:bg-cyan-50 rounded-2xl"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
