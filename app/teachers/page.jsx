import WhyChooseUs from "@/components/Courses/WhyChooseUs";
import TestimonialSection from "@/components/Home/TestimonialSection";
import PagesBanner from "@/components/layout/PagesBanner";
import TeachersReasons from "@/components/Teachers/TeacherReasons/TeachersReasons";
import TeacherSection from "@/components/Teachers/TeacherSection/TecherSection";
import React from "react";
import MeetOurTeachersScrollytelling from "@/components/Teachers/MeetTeacher";

export default function page() {
  return (
    <div className="!overflow-x-hidden">
      <PagesBanner
        title={"Meet Our Teachers "}
        subTitle={"The Heart of Your Arabic Journey Starts Here."}
      />
      <MeetOurTeachersScrollytelling />
      <WhyChooseUs />
      <TeacherSection />
      <TestimonialSection />
    </div>
  );
}
