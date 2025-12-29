"use client";

import React from "react";
import { Bell, Info, AlertTriangle, MessageSquare, X } from "lucide-react";

import { toast } from "react-toastify";

export function ModernToast({
  title,
  body,
  kind = "info",
  time = "now",
  onOpen,
  closeToast,
}) {
  const meta = {
    message: {
      icon: <MessageSquare size={18} />,
      badge: "Message",
      ring: "ring-1 ring-emerald-200",
      dot: "bg-emerald-500",
    },
    alert: {
      icon: <AlertTriangle size={18} />,
      badge: "Alert",
      ring: "ring-1 ring-rose-200",
      dot: "bg-rose-500",
    },
    info: {
      icon: <Info size={18} />,
      badge: "Info",
      ring: "ring-1 ring-sky-200",
      dot: "bg-sky-500",
    },
  }[kind];

  return (
    <div className={`w-full ${meta.ring} rounded-2xl`}>
      <button
        type="button"
        onClick={() => {
          onOpen?.();
          closeToast?.();
        }}
        className="w-full text-left"
      >
        <div className="flex items-start gap-3 p-4">
          {/* left icon */}
          <div className="relative">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
              {meta.icon || <Bell size={18} />}
            </div>
            <span
              className={`absolute -right-1 -bottom-1 h-3 w-3 rounded-full ${meta.dot} ring-2 ring-white`}
            />
          </div>

          {/* content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {meta.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    • {time}
                  </span>
                </div>
                <div className="mt-1 text-sm font-extrabold text-slate-900 line-clamp-1">
                  {title}
                </div>
              </div>

              {/* close */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeToast?.();
                }}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {body ? (
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600 line-clamp-2">
                {body}
              </p>
            ) : null}

            <div className="mt-3 flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">
                Tap to open
              </span>
              <span className="text-[11px] text-slate-400">→</span>
            </div>
          </div>
        </div>

        {/* bottom accent */}
        <div className="h-1 w-full bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
      </button>
    </div>
  );
}

export function showModernToast(opts) {
  toast(
    <ModernToast  
      title={opts.title}
      body={opts.body}
      kind={opts.kind || "message"}
      time={opts.time || "now"}
      onOpen={opts.onOpen}
    />,
    {
      closeButton: false,
      icon: false,
      autoClose: 4500,
    }
  );
}
