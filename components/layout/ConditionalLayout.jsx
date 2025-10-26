"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import AnimatedFooter from "./Footer";
import FloatingButton from "../ui/FloatingButton";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  const hideLayout =
    pathname?.startsWith("/login") || pathname?.startsWith("/register");

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && (
        <>
          <FloatingButton />
          <AnimatedFooter />
        </>
      )}
    </>
  );
}
