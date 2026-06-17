"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * AuthGuard component ensures that only authenticated students can access certain routes.
 * It checks for "eg_user_data" in localStorage or sessionStorage.
 * If no valid student_id is found, it redirects the user to the login page.
 */
export default function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const raw =
        localStorage.getItem("eg_user_data") ??
        sessionStorage.getItem("eg_user_data");

      try {
        if (raw) {
          const userData = JSON.parse(raw);
          if (userData?.student_id) {
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("AuthGuard: Failed to parse user data", e);
      }

      // Not authenticated: redirect to login
      router.replace("/login");
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] w-full">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
}
