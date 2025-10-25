import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer'
import YouTube from 'react-youtube'

const CourseDetails = () => {
  const {id} = useParams()
  const [courseData,setCourseData] = useState(null)
  const [openSections,setOpenSections] = useState({})
  const [isEnrolled,setIsEnrolled] = useState(false)
  const [playerData,setPlayerData] = useState(null)
  const {currency,courses,calculateAvgRating,calculateChapterTime,calculateCourseTime,calculateNoOfLectures} = useContext(AppContext)
  const fetchCourseData = () =>{
    const course = courses.find((course)=>course._id === id)
    setCourseData(course)
  }
  useEffect(()=>{
    fetchCourseData()
  },[courses])
  const toggleSections = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  }
  return courseData ? (
    <>
    {/* Main course details container */}
    <div className='flex md:flex-row flex-col-reverse relative items-start justify-between md:px-36 px-8 pt-20 md:pt-30 text-left gap-10'>
      {/* Background gradient overlay */}
      <div className='absolute top-0 left-0 w-full h-[500px] -z-1 bg-gradient-to-b from-cyan-100/70'></div>
      
      {/* Left column: course info, structure, description */}
      <div className='max-w-xl z-10 text-gray-500'>
        {/* Course title and short description */}
        <h1 className='course-details-heading font-semibold text-gray-800'>{courseData.courseTitle}</h1>
        <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{__html:courseData.courseDescription.slice(0,200)}}></p>
        
        {/* Rating and enrollment stats */}
        <div className='flex items-center space-x-2'>
          <p>{calculateAvgRating(courseData)}</p>
          <div className='flex'>{[...Array(5)].map((_,index)=>(
            <img key={index} src={index < Math.floor(calculateAvgRating(courseData)) ? assets.star : assets.star_blank} alt="" className='w-3.5 h-3.5' />
          ))}</div>
          <p className='text-blue-600'>({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'Ratings' : 'Rating'})</p>
        
          <p className='text-blue-600'>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'Students' : 'Student'}</p>
        </div>
        <p className='text-sm'>Course By <span className='text-blue-600 underline'>Greatstack</span></p>
        
        {/* Course structure / chapter list */}
        <div className='pt-8 items-center space-x-2 text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData.courseContent.map((chapter,index)=>(
              <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                {/* Chapter header (clickable to expand/collapse) */}
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={()=>toggleSections(index)}>
                  <div className='flex items-center space-x-2'>
                    <img className={`transition-transform duration-300 ${openSections[index] ? 'rotate-180' : 'rotate-0'}`} src={assets.down_arrow_icon} alt="" />
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                </div>
                {/* Chapter lectures (expandable) */}
                <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className='list-disc pl-4 md:pl-10 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture,index)=>(
                    <li key={index} className='text-sm flex items-start gap-2 py-1'>
                      <img src={assets.play_icon} alt="" className='w-4 h-4 mt-1' />
                      <div className='flex items-start justify-between w-full text-gray-800 md:text-default'>
                        <p>{lecture.lectureTitle}</p>
                        <div className='flex gap-2'>
                          {lecture.isPreviewFree && <p onClick={()=>setPlayerData({videoId:lecture.lectureUrl.split('/').pop()})} className='text-blue-600'>Preview</p>}
                          <p>{humanizeDuration(lecture.lectureDuration*60000,{units:['h','m'],round:true})}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Full course description */}
        <div className='py-20 text-sm md:text-default'>
          <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
          <div className='rich-text pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{__html:courseData.courseDescription}}></div>
        </div>
      </div>
      
      {/* Right column: enrollment card */}
      <div className='max-w-2xl z-10 shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)] rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:max-w-[420px]'>
        {
              playerData ? 
              <YouTube videoId={playerData.videoId} opts={{playerVars:{autoplay:1,rel:0}}} iframeClassName='w-full aspect-video' />
              :
              <img src={courseData.courseThumbnail} alt="" />
            }
        {/* Course thumbnail */}
        <div className='p-5'>
          {/* Price urgency banner */}
          <div className='flex items-center gap-2'>
            <img src={assets.time_left_clock_icon} className='w-3.5' alt="" />
            <p className='text-red-500'><span className='font-medium'>5 days</span>left at that price</p>
          </div>
          
          {/* Pricing */}
          <div className='flex items-center gap-3 pt-2'>
            <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>{currency} {(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}</p>
            <p className='md:text-lg text-gray-500 line-through'>{currency} {courseData.coursePrice.toFixed(2)}</p>
            <p className='text-gray-500 md:text-lg'>{courseData.discount}% off</p>
          </div>
          
          {/* Course stats */}
          <div className='flex items-center  text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>
            <div className='flex gap-2'>
              <img src={assets.star} alt="" />
              <p>{calculateAvgRating(courseData)}</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40'></div>
            <div className='flex gap-2'>
              <img src={assets.time_clock_icon} alt="" />
              <p>{calculateCourseTime(courseData)}</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40'></div>
            <div className='flex gap-2'>
              <img src={assets.time_clock_icon} alt="" />
              <p>{calculateNoOfLectures(courseData)} lessons</p>
            </div>
          </div>
          
          {/* Enrollment button */}
          <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium'>{isEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>
          
          {/* Course features list */}
          <div className='pt-6'>
            <p className='md:text-xl text-lg font-medium text-gray-800'>What's in the course?</p>
            <ul className='ml-4 pt-2 text-sm md:text-default list-disc text-gray-500'>
              <li>Lifetime access and free updates</li>
              <li>Step-by-step hands on project guidance</li>
              <li>Downlable project resources and source code</li>
              <li>Quizes to test your knowledge</li>
              <li>Certificates of completion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    {/* Footer */}
    <Footer/>
    </>
  ) : (
    <Loading/>
  )
}

export default CourseDetails