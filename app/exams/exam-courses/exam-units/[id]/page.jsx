"use client";
import React, { useState } from "react";
import PagesBanner from "../../../../../components/layout/PagesBanner";
import ExamUnitCards from "../../../../../components/Exams/ExamUnitCards/ExamUnitCards";



export default function CourseUnitsPage() {
  const [expandedUnitId, setExpandedUnitId] = useState(null);
   const [hoveredCard , setHoveredCard] = useState(null);

  return (
    <div>
      <PagesBanner title={"Exam Units"} />

     <ExamUnitCards />
    </div>
  );
}
