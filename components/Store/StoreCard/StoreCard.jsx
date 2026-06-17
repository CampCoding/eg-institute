"use client";
import { ArrowRight, Heart, ShoppingCart, Star, Check } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function StoreCard({ p, PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT }) {

  const [favorites, setFavorites] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("store-cart")) || [];
    const isInCart = storedCart.some((item) => item.id === p.id);
    setAddedToCart(isInCart);
  }, [p.id]);

  // Toggle favorite
  function toggleFavorite(id) {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  }

  // Add to cart handler
  function handleAddToCart(item) {
    const storedCart = JSON.parse(localStorage.getItem("store-cart")) || [];
    const isAlreadyInCart = storedCart.some((i) => i.id === item.id);
    if (!isAlreadyInCart) {
      const updatedCart = [...storedCart, item];
      localStorage.setItem("store-cart", JSON.stringify(updatedCart));
      setAddedToCart(true);
    }
  }

  useEffect(() => {
    console.log(p)
  } , [p])

  return (
    <article
      key={p.id}
      className="group bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col transform hover:-translate-y-2 hover:scale-[1.02]"
      onMouseEnter={() => setHoveredCard(p.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Tag */}
        {p.tag && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
            style={{
              backgroundImage: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
            }}
          >
            {p.tag}
          </div>
        )}
        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(p.id);
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-300 ${
              favorites.has(p.id)
                ? "fill-[#ef4444] text-[#ef4444]"
                : "text-slate-400 hover:text-[#ef4444]"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <div className="text-2xl">{p.badge}</div>
          <div className="flex-1">
            <h3
              className="text-xl font-bold transition-colors duration-300"
              style={{ color: "#0f172a" }}
            >
              {p.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-slate-900">
                  {p.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-slate-500">
                ({p.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">
          {p.desc}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black" style={{ color: PRIMARY }}>
              ${p.price.toFixed(2)}
            </span>
            {p.originalPrice && p.originalPrice > p.price && (
              <span className="text-sm text-slate-500 line-through">
                ${p.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {p.originalPrice && p.originalPrice > p.price && (
            <div
              className="px-2 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "#FEF2F2", color: "#B91C1C" }}
            >
              Save ${(p.originalPrice - p.price).toFixed(2)}
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          type="button"
          disabled={addedToCart}
          onClick={() => handleAddToCart(p)}
          className={`group/btn w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-semibold active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl ${
            addedToCart
              ? "bg-green-500 text-white cursor-not-allowed"
              : "text-white"
          }`}
          style={{
            backgroundImage: addedToCart
              ? "none"
              : `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_DARK})`,
          }}
        >
          {addedToCart ? (
            <>
              <Check className="w-5 h-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
              Add to Cart
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </button>

        {/* Category */}
        <div className="mt-4 flex justify-between items-center">
          <span
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{
              backgroundColor: "#F0FBFA",
              color: PRIMARY_DARK,
              borderColor: "#CFF3EF",
            }}
          >
            {p.type === "books"
              ? "📚 Book"
              : p.type === "supplies"
              ? "📝 Supply"
              : "🎥 Video Course"}
          </span>
          <div className="text-xs text-slate-500 font-medium">
            Premium Quality
          </div>
        </div>
      </div>
    </article>
  );
}
