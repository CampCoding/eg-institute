"use client";

import BlogsSection from "../../components/Blogs/BlogsSection";
import PagesBanner from "../../components/layout/PagesBanner";

export default function BlogCards() {
  return (
    <main>
      <PagesBanner
        title="Blogs"
        subTitle={
          "Explore Arabic, Embrace the Culture – Your Journey Starts Here"
        }
      />
      <BlogsSection />
    </main>
  );
}
