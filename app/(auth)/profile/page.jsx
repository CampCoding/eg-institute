"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    const raw =
      localStorage.getItem("eg_user_data") ??
      sessionStorage.getItem("eg_user_data");

    try {
      if (raw) {
        const userData = JSON.parse(raw);
        if (userData?.student_id) {
          router.replace(`/profile/${userData.student_id}`);
          return;
        }
      }
    } catch (e) {
      console.error("Failed to parse user data", e);
    }

    // Fallback to login if no user data or ID
    router.replace("/login");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );
}
