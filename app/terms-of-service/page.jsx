import React from "react";
import PagesBanner from "@/components/layout/PagesBanner";
import Terms from "@/components/Terms";

export default function page() {
  return (
    <>
      <PagesBanner
        title={"TERMS OF SERVICE"}
        subTitle={"STUDENT ORIENTATION & Terms of Service"}
        isLarge={true}
        backgroundImage={
          "/images/rear-view-young-college-student-paying-attention-listening-her-online-teacher-laptop-home-scaled.jpg"
        }
      />
      <Terms />
    </>
  );
}
