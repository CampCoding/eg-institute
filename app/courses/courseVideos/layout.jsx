import AuthGuard from "@/components/shared/AuthGuard";

export default function CourseVideosLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
