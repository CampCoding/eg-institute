"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4500}
      closeOnClick
      pauseOnHover
      draggable
      newestOnTop
      limit={4}
      theme="light"
      toastClassName={() =>
        [
          "rounded-2xl",
          "border border-slate-200/70",
          "bg-white/90 backdrop-blur-xl",
          "shadow-xl shadow-slate-200/60",
          "p-0 overflow-hidden",
          "min-w-[280px] max-w-[420px]",
        ].join(" ")
      }
      bodyClassName={() => "p-0 m-0"}
      progressClassName={() => "bg-slate-900/80"}
      className="!z-[99999]"
    />
  );
}
