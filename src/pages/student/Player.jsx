import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import { div } from 'framer-motion/client'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext)
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)

  const getCourseData = () =>{
    enrolledCourses.map((course)=>{
      if(course.id === courseId){
        setCourseData(course)
      }
    })
  }
  useEffect(()=>{
    getCourseData()
  })
  const toggleSections = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  if (!courseData) {
    return (
      <div className='p-4 sm:p-10 md:px-36 text-gray-600'>
        Course not found or still loading...
      </div>
    )
  }

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        {/* left column */}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData.chapters && courseData.chapters.map((chapter, chapterIndex) => (
              <div key={chapter.chapterId || chapterIndex} className='border border-gray-300 bg-white mb-2 rounded'>
                {/* Chapter header (clickable to expand/collapse) */}
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSections(chapterIndex)}>
                  <div className='flex items-center space-x-2'>
                    <img className={`transition-transform duration-300 ${openSections[chapterIndex] ? 'rotate-180' : 'rotate-0'}`} src={assets.down_arrow_icon} alt="" />
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p>{chapter.chapterContent ? chapter.chapterContent.length : 0} lectures - {calculateChapterTime(chapter)}</p>
                </div>
                {/* Chapter lectures (expandable) */}
                <div className={`overflow-hidden transition-all duration-300 ${openSections[chapterIndex] ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className='list-disc pl-4 md:pl-10 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent && chapter.chapterContent.map((lecture, lectureIndex) => (
                      <li key={lecture.lectureId || lectureIndex} className='text-sm flex items-start gap-2 py-1'>
                        <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="" className='w-4 h-4 mt-1' />
                        <div className='flex items-start justify-between w-full text-gray-800 md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.lectureUrl && (
                              <p
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: chapterIndex + 1,
                                    lecture: lectureIndex + 1
                                  })
                                }
                                className='text-blue-600 cursor-pointer'
                              >
                                Watch
                              </p>
                            )}
                            <p>{humanizeDuration(lecture.lectureDuration * 60000, { units: ['h', 'm'], round: true })}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this course</h1>
            <Rating initialRating={0}/>
          </div>
        </div>
        {/* right column */}
        <div className='md:mt-10'>
          {playerData ? (
            <div>
              <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video' />
              <div className='flex justify-between items-center mt-1'>
                <p>{playerData.chapter} . {playerData.lecture} . {playerData.lectureTitle}</p>
                <button className='text-blue-600'>{false ? 'Completed' : 'Mark Complete'}</button>
              </div> 
            </div>
          ) : 
          <img src={courseData ? courseData.courseThumbnail: ''} alt="" />
          } 
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Player