import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl font-semibold text-gray-800'>Lean Anything from Anywhere!</h1>
      <p className='text-gray-500 text-sm md:text-base'>Join our community of learners and start your journey today!</p>
      <div className='flex items-center gap-6 mt-4 font-medium'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600'>Get Started</button>
        <button className='flex items-center gap-2'>Learn More <img src={assets.arrow_icon} alt="" /></button>
      </div>
    </div>
  )
}

export default CallToAction