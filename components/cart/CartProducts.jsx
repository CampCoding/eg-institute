"use client";
import { Heart, Minus, Plus, ShoppingCart, Star, Trash2, Zap } from 'lucide-react'
import React , {useEffect} from 'react'

export default function CartProducts({cartItems , setCurrentStep  , setCartItems  }) {
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

 
  return (
<div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="relative mb-6">
                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-inner">
                  <ShoppingCart className="w-16 h-16 text-gray-300" />
                </div>
                <div className="absolute -top-2 -right-2 p-2 bg-gradient-to-r from-[#02AAA0] to-[#00C2BA] rounded-full">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                Your cart awaits
              </h3>
              <p className="text-gray-500 mb-6 max-w-sm">
                Discover amazing products and add them to your cart to get
                started!
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-[#02AAA0] to-[#00C2BA] text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {subtotal < 100 && (
                <div className="bg-gradient-to-r from-[#E0FBF9] to-[#D6F9F7] rounded-2xl p-4 border border-[#B2F1EB]">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-5 h-5 text-[#02AAA0]" />
                    <span className="text-sm font-semibold text-[#02827c]">
                      Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                    </span>
                  </div>
                  <div className="w-full bg-[#CFF5F3] rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-[#02AAA0] to-[#00C2BA] h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((subtotal / 100) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#F0FDFD] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative flex gap-5">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-2xl border-2 border-gray-100 shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.quantity > 1 && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#02AAA0] to-[#00C2BA] text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-lg">
                          {item.quantity}
                        </div>
                      )}
                      {item.originalPrice > item.price && (
                        <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          {Math.round(
                            (1 - item.price / item.originalPrice) * 100
                          )}
                          % OFF
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            {item.brand}
                          </p>
                          <h3 className="font-bold text-gray-900 leading-tight text-lg">
                            {item.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={`${item.id}-star-${i}`}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({item.rating})
                        </span>
                      </div>

                      <div className="flex gap-2 mb-4">
                        {item.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-3 hover:bg-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="px-6 py-3 text-lg font-bold text-gray-800 min-w-[4rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-3 hover:bg-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        <div className="text-right">
                          {item.originalPrice > item.price && (
                            <p className="text-sm text-gray-400 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </p>
                          )}
                          <p className="text-2xl font-bold bg-gradient-to-r from-[#02AAA0] to-[#00C2BA] bg-clip-text text-transparent">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button 
              className=" p-4 text-white ms-auto flex justify-center items-center rounded-2xl font-bold bg-gradient-to-r from-[#02AAA0] via-[#00C2BA] to-[#02AAA0]"
              onClick={() => setCurrentStep(1)}>Continue</button>
            </>
          )}
        </div>  )
}
