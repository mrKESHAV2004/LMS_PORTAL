import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { useState,useEffect  } from 'react'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

const CourseList = () => {
  const {navigate,courses} = useContext(AppContext)
  const {input} = useParams()
  const [filteredCourses,setFilteredCourses] = useState([])
  useEffect(()=>{
    if (input){
      setFilteredCourses(courses.filter(course=>course.courseTitle.toLowerCase().includes(input.toLowerCase())))
    }
    else{
      setFilteredCourses(courses)
    }
  },[input,courses])


  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
        <div className='flex items-start justify-between w-full md:flex-row flex-col gap-6 '>
        <div >
          <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
          <p className='text-gray-500'><span className='text-blue-600 cursor-pointer' onClick={()=>navigate('/')}>Home</span> / <span>Course List</span></p>
        </div>
        <SearchBar data={input}/>
      </div>
      {
        input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 rounded-md text-gray-800'>
          <p>{input}</p><img src={assets.cross_icon} className='cursor-pointer' onClick={()=>navigate('/courses')} alt="" />
        </div>
      }
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-16 px-2 md:p-0'>
        {filteredCourses.map((course)=><CourseCard key={course.id} course={course}/>)}
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default CourseList