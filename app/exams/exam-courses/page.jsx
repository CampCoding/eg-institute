import React from 'react'
import PagesBanner from '../../../components/layout/PagesBanner'
import ExamCoursesContent from '../../../components/Exams/ExamCourses/ExamCoursesContent/ExamCoursesContent'


const courses = [
  {
    id:1,

  }
]
export default function page() {
  return (
    <div>
      <PagesBanner title={"Exam Courses"} subTitle={""}/>
      <ExamCoursesContent/>
    </div>
  )
}
