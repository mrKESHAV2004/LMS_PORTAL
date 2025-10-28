import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/student/HomePage.jsx'
import CourseList from './pages/student/CourseList.jsx'
import CourseDetails from './pages/student/CourseDetails.jsx'
import Player from './pages/student/Player.jsx'
import MyEnrollments from './pages/student/MyEnrollments.jsx'
import Loading from './pages/Loading.jsx'
import Educator from './pages/educator/Educator.jsx'
import Dashboard from './pages/educator/Dashboard.jsx'
import AddCourse from './pages/educator/AddCourse.jsx'
import MyCourse from './pages/educator/MyCourse.jsx'
import StudentsEnrolled from './pages/educator/StudentsEnrolled.jsx'
import Navbar from './components/student/Navbar.jsx'
import { useMatch } from 'react-router-dom'
import Profile from './pages/Profile.jsx'
const App = () => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className="text-default min-h-screen bg-white">
      {isEducatorRoute ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/me" element={<Profile />} />
        <Route path='/educator' element={<Educator />}>
          <Route path='/educator' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourse />} />
          <Route path='students-enrolled' element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App