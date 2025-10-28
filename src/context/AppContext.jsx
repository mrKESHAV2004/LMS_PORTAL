import { createContext } from "react";
import { useState, useEffect, useCallback } from "react";
import authentication from "./auth";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import courseFunctions from "./courseFunction";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseapp from "./firebase";
import studentFunctions from "./studentFunctions";

export const AppContext = createContext()


export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()
  const [courses,setCourses] = useState([])
  const [isEducator,setIsEducator] = useState(true)
  const [enrolledCourses,setEnrolledCourses] = useState([])
  const [user, setUser] = useState(null)
  const db = getFirestore(firebaseapp)
  

  const calculateAvgRating = (course) =>{
    if (course.ratings.length === 0){
      return 0 
    }
    else{
      let totalRatings = 0
      course.ratings.forEach(rating =>{
        totalRatings += rating.rating
      })
      return totalRatings / course.ratings.length
    }
  }
  const calculateChapterTime = (chapter) =>{
    let time = 0
    chapter.chapterContent.map((lecture) => time+=lecture.lectureDuration)
    return humanizeDuration(time*60000,{units:['h','m'],round:true})
  }
  const calculateCourseTime = (course) => {
    let totalMinutes = 0;
    course.chapters.forEach(chapter => {
      chapter.chapterContent.forEach(lecture => {
        totalMinutes += lecture.lectureDuration;
      });
    });
    return humanizeDuration(totalMinutes * 60000, { units: ['h', 'm'], round: true });
  }
  const calculateNoOfLectures = (course) =>{
    let totalLectures = 0
    course.chapters.forEach(chapter => {
      if(Array.isArray(chapter.chapterContent)){
        totalLectures += chapter.chapterContent.length
      }
    })
    return totalLectures
  }

  const fetchAllCourses = async () =>{
    setCourses(await courseFunctions.getAllCourses())
  }

  const fetchEnrolledCourses = useCallback(async () =>{
    if (user){
      setEnrolledCourses(await studentFunctions.generateEnrolledCoursesList(user.uid))
    } else {
      setEnrolledCourses([])
    }
  }, [user])

  const fetchUserData = useCallback(async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          uid: uid,
          ...userData
        });
        setIsEducator(userData.isEducator || false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [db]);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = authentication.listenToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        fetchUserData(firebaseUser.uid);
      } else {
        setUser(null);
        setIsEducator(true); // Reset to default
      }
    });

    fetchAllCourses();
    fetchEnrolledCourses();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [fetchUserData, fetchEnrolledCourses])

  const value = {studentFunctions,courseFunctions,authentication,currency,courses,navigate,calculateAvgRating,isEducator,setIsEducator,calculateChapterTime,calculateCourseTime,calculateNoOfLectures,enrolledCourses,user}
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}