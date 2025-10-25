import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../Loading'
import { assets } from '../../assets/assets'

const StudentEnrolled = () => {
  const {currency} = useContext(AppContext)
  const [enrolledStudentsData,setEnrolledStudentsData] = useState(null)
  const fetchStudentData = async () => {
    setEnrolledStudentsData(dummyStudentEnrolled)
  }
  useEffect(() => {
    fetchStudentData()
  },[])
  return enrolledStudentsData ?  (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
            <table className='table-fixed md:table-auto w-full overflow-hidden'>
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                  <th className='px-4 py-3 font-semibold'>Student Name</th>
                  <th className='px-4 py-3 font-semibold'>Course Title</th>
                  <th className='px-4 py-3 font-semibold'>Date</th>
                </tr>
              </thead>
              <tbody className='text-gray-500 text-sm'>
                {enrolledStudentsData.map((item,index)=>(
                  <tr key={index} className='border-b border-gray-500/20'>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{index+1}</td>
                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                      <img src={item.student.imageUrl} className='w-9 h-9 rounded-full' alt="" />
                      <span className='truncate'>{item.student.name}</span>
                    </td>
                    <td className='px-4 py-3'>{item.courseTitle}</td>
                    <td className='px-4 py-3'>{new Date(item.purchaseDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  ) : <Loading/>
}

export default StudentEnrolled