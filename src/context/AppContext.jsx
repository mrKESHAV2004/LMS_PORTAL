import { createContext } from "react";
import { useState } from "react";
import authentication from "./auth";
import { dummyCourses } from "../assets/assets";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext()


export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()
  const [courses,setCourses] = useState([])
  const [isEducator,setIsEducator] = useState(true)
  const [enrolledCourses,setEnrolledCourses] = useState([])


  const calculateAvgRating = (course) =>{
    if (course.courseRatings.length === 0){
      return 0 
    }
    else{
      let totalRatings = 0
      course.courseRatings.forEach(rating =>{
        totalRatings += rating.rating
      })
      return totalRatings / course.courseRatings.length
    }
  }
  const calculateChapterTime = (chapter) =>{
    let time = 0
    chapter.chapterContent.map((lecture) => time+=lecture.lectureDuration)
    return humanizeDuration(time*60000,{units:['h','m'],round:true})
  }
  const calculateCourseTime = (course) => {
    let totalMinutes = 0;
    course.courseContent.forEach(chapter => {
      chapter.chapterContent.forEach(lecture => {
        totalMinutes += lecture.lectureDuration;
      });
    });
    return humanizeDuration(totalMinutes * 60000, { units: ['h', 'm'], round: true });
  }
  const calculateNoOfLectures = (course) =>{
    let totalLectures = 0
    course.courseContent.forEach(chapter => {
      if(Array.isArray(chapter.chapterContent)){
        totalLectures += chapter.chapterContent.length
      }
    })
    return totalLectures
  }

  const fetchAllcourses = async () =>{
    setCourses(dummyCourses)
  }

  const fetchEnrolledCourses = async () =>{
    setEnrolledCourses(dummyCourses)
  }


  useEffect(()=>{
    fetchAllcourses()
    fetchEnrolledCourses()
  },[])
  const value = {authentication,currency,courses,navigate,calculateAvgRating,isEducator,setIsEducator,calculateChapterTime,calculateCourseTime,calculateNoOfLectures,enrolledCourses}
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}