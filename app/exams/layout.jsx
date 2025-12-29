import AuthGuard from "@/components/shared/AuthGuard";

export default function ExamsLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
