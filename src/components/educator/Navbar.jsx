import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const educatorData = dummyEducatorData
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b vorder-gray-500 py-3'>
        <Link to='/'>
            <img src={assets.logo} alt="" className='w-28 lg:w-32' />
        </Link>
        <div>
            <p>Hi! Developer</p>

        </div>
    </div>
  )
}

export default Navbar