import WhyChooseUs from '@/components/Courses/WhyChooseUs'
import TestimonialSection from '@/components/Home/TestimonialSection'
import PagesBanner from '@/components/layout/PagesBanner'
import TeachersReasons from '@/components/Teachers/TeacherReasons/TeachersReasons'
import TeacherSection from '@/components/Teachers/TeacherSection/TecherSection'
import React from 'react'

export default function page() {
  return (
    <div className='!overflow-x-hidden'>
        <PagesBanner title={"Teachers"}/>
        <WhyChooseUs />
        <TeacherSection />
        <TestimonialSection />
    </div>
  )
}
