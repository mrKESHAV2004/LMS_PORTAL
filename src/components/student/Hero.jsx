import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'
const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b  from-cyan-100/70 '>
      <h1 className='home-heading-large max-w-3xl mx-auto text-gray-800 font-bold text-4xl relative'>Empower Your Future with courses designed to <span className='text-blue-600'>fit your choice</span><img src={assets.sketch} alt="" className='md:block hidden absolute -bottom-7 right-0'/></h1>
      <p className='max-w-2xl mx-auto text-gray-500 text-lg md:block hidden'>
        We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and proffessional goals.
      </p>
      <p className='max-w-2xl mx-auto text-gray-500 text-lg md:hidden'>
        We bring together world-class instructors to help you achieve your proffessional goals.
      </p>

      <SearchBar/>
    </div>
  )
}

export default Hero