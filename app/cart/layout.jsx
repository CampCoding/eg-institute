import AuthGuard from "@/components/shared/AuthGuard";

export default function CartLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
