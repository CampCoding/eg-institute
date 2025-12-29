import AuthGuard from "@/components/shared/AuthGuard";

export default function CourseContentLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
