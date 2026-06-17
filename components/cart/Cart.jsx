"use client";
import React, { useEffect, useState } from "react";
import {
  Trash2,
  X,
  ShoppingCart,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Star,
  Gift,
  Zap,
} from "lucide-react";
import CartProducts from "./CartProducts";
import PaymentDrawer from "./CheckoutPayment";
import CartDone from "./CartDone";

const CartStepper = ({ currentStep }) => {
  const steps = ["Cart", "Payment", "Done"];

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              index <= currentStep
                ? "bg-[#02AAA0] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`text-sm font-medium ${
              index <= currentStep ? "text-[#02AAA0]" : "text-gray-400"
            }`}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className="w-20 h-px bg-gray-300 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
};


export default function ShoppingCartDrawer({ openCart, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  useEffect(() => {
    const savedCard = JSON.parse(localStorage.getItem("card-info"));
    if (savedCard) setCardData(savedCard);
  }, []);

  useEffect(() => {
    console.log(currentStep)
  } , [currentStep])

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...cardData, [name]: value };
    setCardData(updated);
    localStorage.setItem("card-info", JSON.stringify(updated));
  };

  const updateQuantity = (id, amount) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: Math.max(newQty, 1) };
      }
      return item;
    });
    setCartItems(updated);
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const savings = originalTotal - subtotal;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        title: "AirPods Pro 2nd Generation",
        brand: "Apple",
        price: 249.99,
        originalPrice: 299.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop&crop=center",
        rating: 4.8,
        inStock: true,
        features: ["Noise Cancelling", "Wireless Charging"],
      },
      {
        id: 2,
        title: "MacBook Pro 14-inch M3",
        brand: "Apple",
        price: 1599.99,
        originalPrice: 1799.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
        rating: 4.9,
        inStock: true,
        features: ["M3 Chip", "16GB RAM"],
      },
      {
        id: 3,
        title: "Magic Mouse",
        brand: "Apple",
        price: 79.99,
        originalPrice: 99.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center",
        rating: 4.5,
        inStock: true,
        features: ["Multi-Touch", "Rechargeable"],
      },
    ];
    setCartItems(mockCartItems);
  }, []);

  useEffect(() => {
    if (openCart) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [openCart]);

  useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") onClose();
  };
  window.addEventListener("keydown", handleEsc);
  return () => window.removeEventListener("keydown", handleEsc);
}, [onClose]);


  return (
    <div 
    onClick={(e) => {
        onClose();
      
    }}
    className="fixed inset-0 !z-[99999] bg-gradient-to-br from-[#02aaa010] via-[#02aaa020] to-[#02aaa030] backdrop-blur-md flex justify-end">
      <div
      onClick={(e) => e.stopPropagation()}
      className="w-full sm:max-w-lg h-full bg-gradient-to-b from-gray-50 via-white to-gray-50 shadow-2xl flex flex-col transform transition-all duration-500 ease-out animate-in slide-in-from-right">
        <div className="relative bg-gradient-to-r from-[#02AAA0] via-[#00C2BA] to-[#02AAA0] text-white px-6 py-8 overflow-hidden">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xl border border-white/30 shadow-lg">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  My Cart
                </h2>
                <p className="text-sm text-white/80 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Premium Shopping Experience
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 hover:rotate-90 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <CartStepper currentStep={currentStep} />

        {currentStep == 0 && (
          <CartProducts
            setCartItems={setCartItems}
            setCurrentStep={setCurrentStep}
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            subtotal={subtotal}
            shipping={shipping}
            totalItems={totalItems}
          />
        )}

        {currentStep == 1 && (
          <PaymentDrawer
            cartItems={cartItems}
            totalItems={totalItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            savings={savings}
            total={total}
            setCurrentStep={setCurrentStep}
          />
        )}

        {currentStep == 2 && <CartDone />}
      </div>
    </div>
  );
}
