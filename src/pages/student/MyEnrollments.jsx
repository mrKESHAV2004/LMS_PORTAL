import React from 'react'

import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'

const MyEnrollments = () => {
    const {enrolledCourses,calculateCourseTime,calculateNoOfLectures,navigate} = useContext(AppContext)
    const [progressArray,setProgressArray] = useState([
      {lectureCompleted:4,totalLectures:10},
      {lectureCompleted:0,totalLectures:10},
      {lectureCompleted:4,totalLectures:10},
      {lectureCompleted:6,totalLectures:10},
      {lectureCompleted:2,totalLectures:10},
      {lectureCompleted:10,totalLectures:10},
      {lectureCompleted:2,totalLectures:10},
      {lectureCompleted:6,totalLectures:10},
      {lectureCompleted:2,totalLectures:10},
      {lectureCompleted:8,totalLectures:10},
    ])
  return (
    <>
      <div className='md:px-36 px-8 pt-10 '>
        <h1 className='text-2xl font-bold'>My Enrollments</h1>
        <table className='md:table-auto w-full table-fixed overflow-hidden mt-10 border border-gray-300'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
            <tr>
              <th className='px-4 font-semibold truncate'>Course Name</th>
              <th className='px-4 font-semibold truncate'>Duration</th>
              <th className='px-4 font-semibold truncate'>Completed</th>
              <th className='px-4 font-semibold truncate'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {enrolledCourses.map((course) => (
              <tr key={course.courseId} className='border-b border-gray-500/20'>
                <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                  <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28 rounded-md' />
                  <div className='flex-1 mb-1 max-sm:text-sm'>
                    <p>{course.courseTitle}</p>
                    <Line strokeWidth={2} percent={progressArray[enrolledCourses.indexOf(course)].lectureCompleted/progressArray[enrolledCourses.indexOf(course)].totalLectures*100} className='bg-gray-300 rounded-full'/>
                  </div>
                </td>
                <td className='md:px-4 py-3 max-sm:hidden'>{calculateCourseTime(course)}</td>
                <td className='md:px-4 py-3 max-sm:hidden'>{progressArray[enrolledCourses.indexOf(course)] && `${progressArray[enrolledCourses.indexOf(course)].lectureCompleted}/${progressArray[enrolledCourses.indexOf(course)].totalLectures}`} lectures</td>
                <td className='md:px-4 py-3 px-2 max-sm:text-right'> 
                  <button className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md max-sm:text-sm cursor-pointer' onClick={()=>navigate(`/player/${course._id}`)}>
                    {progressArray[enrolledCourses.indexOf(course)] && progressArray[enrolledCourses.indexOf(course)].lectureCompleted === progressArray[enrolledCourses.indexOf(course)].totalLectures ? 'Completed' :'On going'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    <Footer/>
    </>
  )
}

export default MyEnrollments