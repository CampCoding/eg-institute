"use client";
import React, { useState, useEffect } from 'react';
import ExamCard from '../../../../../../components/Exams/ExamCard/ExamCard';
import PagesBanner from '../../../../../../components/layout/PagesBanner';

export default function ExamCardsPage() {
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      <PagesBanner title={"Course Examinations"} subTitle={"Test your Arabic language skills and track your progress"}/>
      <ExamCard />
    </div>
  );
}