"use client";
import ExamBanner from '@/components/Exams/ExamBanner/ExamBanner';
import PagesBanner from '@/components/layout/PagesBanner';
import React, { useState } from 'react'
import ExamStatistics from '../../components/Exams/ExamStatistics/ExamStatistics';
import { BookOpen, CheckCircle, Trophy, Users } from 'lucide-react';
import ExamInstrcutions from '../../components/Exams/ExamInstructions/ExamInstrcutions';

export default function page() {
    const [isLogin , setIsLogin] = useState(false);

    if(!isLogin) {
        return ( 
            <div>
              <PagesBanner title={"Exams"} subTitle={"Test how well you comprehend spoken Egyptian Arabic."} />
              <ExamStatistics />
              <ExamInstrcutions setIsLogin={setIsLogin} isLogin={isLogin} />
                {/* <PagesBanner title={"Exams"}/>  */}
            </div>
        )
    }
  return (
    <div>page</div>
  )
}
