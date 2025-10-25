import React from 'react'
import { assets } from '../../assets/assets'
const Companies = () => {
  return (
    <div className='pt-16'>
      <p className='text-gray-500/80'>Trusted Learners from</p>
      <div className='flex flex-wrap gap-6 md:gap-16 md:mt-10 mt-5 items-center justify-center'>
        <img src={assets.microsoft_logo} alt="" className='w-20 md:w-28' />
        <img src={assets.accenture_logo} alt="" className='w-20 md:w-28' />
        <img src={assets.adobe_logo} alt="" className='w-20 md:w-28' />
        <img src={assets.paypal_logo} alt="" className='w-20 md:w-28' />
        <img src={assets.walmart_logo} alt="" className='w-20 md:w-28' />
      </div>
    </div>
  )
}

export default Companies