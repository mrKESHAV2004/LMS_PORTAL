import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../Loading'
import { useState } from 'react'
const MyCourse = () => {
  const {currency, courseFunctions, user} = useContext(AppContext)
  const [educatorCourses,setEducatorCourses] = useState(null)
  const fetchEducatorCourses = async () => {
    setEducatorCourses(await courseFunctions.getUserCourses(user?.uid))
  }
  useEffect(() => {
    fetchEducatorCourses()
  }, [])
  return educatorCourses ? (
    <div className='h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
          <table className='table-fixed md:table-auto w-full overflow-hidden'>
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                  <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                  <th className='px-4 py-3 font-semibold truncate hidden md:table-cell'>Students</th>
                  <th className='px-4 py-3 font-semibold truncate'>Published on</th>
                </tr>
              </thead>
              <tbody className='text-gray-500 text-sm'>
                {educatorCourses.map((course) => (
                  <tr key={course._id} className='border-b border-gray-500/20'>
                    <td className='md:px-4 pl-2 md:pl-4 flex items-center space-x-3 py-3 truncate '>
                      <img src={course.courseThumbnail} className='w-16' alt="" />
                      <span className='truncate hidden md:block'>{course.courseTitle}</span>
                    </td>
                    <td className='px-4 py-3'>{currency} {(course.enrollments.length * (course.coursePrice - course.discount * course.coursePrice / 100)).toFixed(2)}</td>
                    <td className='px-4 py-3 hidden md:table-cell'>{course.enrollments.length || 0}</td>
                    <td className='px-4 py-3'>{new Date(course.createdAt.toDate()).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  ): 
  <Loading/>
}

export default MyCourse