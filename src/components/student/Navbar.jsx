import React, { useState, memo } from 'react'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { AppContext } from '../../context/AppContext'
import { useContext } from 'react'
import AuthModal from '../AuthModal'

// Updated Navbar Component
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authentication,isEducator } = useContext(AppContext);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const unsubscribe = authentication.listenToAuthChanges((currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, [authentication]);

  const handleLogout = async () => {
    try {
      await authentication.signoutUser();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const isCourseListPage = location.pathname.includes('/course-list');
  const {navigate} = useContext(AppContext)

  return (
    <>
      <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-400 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70 shadow-md'}`}>
        <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='w-28 lg:w-32 cursor-pointer' />
        
        <div className="hidden md:flex items-center gap-5 text-gray-500">
          <div className='flex items-center gap-5 '>
            {
              user &&
              <>
                <button onClick={()=>navigate('/educator')}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                <Link to="/my-enrollments" className='text-sm'>My Enrollments</Link>
              </>
            }
          </div>
          
          {user ? (
            <div className="flex items-center gap-3">
              
              <span className="text-sm font-semibold text-gray-700">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600"
            >
              Create Account
            </button>
          )}
        </div>

        <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
          <div className='flex items-center gap-5 '>
            {
              user &&
              <>
                <button onClick={()=>navigate('/educator')}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                <Link to="/my-enrollments" className='text-sm'>My Enrollments</Link>
              </>
            }
            {user ? (
              <button onClick={handleLogout}>
                <img src={assets.logout_icon || '🚪'} alt="Logout" />
              </button>
            ) : (
              <button onClick={() => setIsModalOpen(true)}>
                <img src={assets.user_icon} alt="" />
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAuthSuccess={() => {
          // After successful login/signup, re-fetch the current user
          const currentUser = authentication.getCurrentUser();
          setUser(currentUser);
        }}
      />
    </>
  )
}

export default Navbar