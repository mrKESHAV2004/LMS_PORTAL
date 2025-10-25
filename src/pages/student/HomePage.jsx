import React from 'react'
import CallToAction from '../../components/student/CallToAction'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialSection from '../../components/student/TestimonialSection'
import Footer from '../../components/student/Footer'
const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center'>
      <Hero/>
      <Companies/>
      <CoursesSection/>
      <TestimonialSection/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default HomePage