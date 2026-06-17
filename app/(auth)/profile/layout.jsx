import AuthGuard from "@/components/shared/AuthGuard";

export default function ProfileLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
