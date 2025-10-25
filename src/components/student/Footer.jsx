import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
    <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start justify-between items-center w-full">
            <img src={assets.logo_dark} alt="" />
            <p className='text-gray-400 text-sm text-center md:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut amet earum consequatur, excepturi omnis at adipisci voluptas dolorum impedit.</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
            <h2 className='text-white text-lg font-semibold mb-5'>Company</h2>
            <ul className='flex md:flex-col w-full text-sm justify-between gap-2 text-white/80 md:space-y-2'>
                <li> <a href='#' className='text-gray-400 text-sm'>Home</a></li>
                <li> <a href='#' className='text-gray-400 text-sm'>About Us</a></li>
                <li> <a href='#' className='text-gray-400 text-sm'>Contact Us</a></li>
                <li> <a href='#' className='text-gray-400 text-sm'>Privacy Policy</a></li>
            </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full '>
            <h2 className='text-white text-lg font-semibold mb-5'>Subscribe to our Newsletter</h2>
            <p className='text-white/80 text-sm'>The latest news, articles, and resources sent to your inbox weekly</p>
            <div className='flex items-center gap-2 pt-4'>
                <input type="email" placeholder='Enter your email' className='p-2 rounded-md border border-gray-500/30 bg-gray-800 text-gray-500 placehodler-gray-500 outline-none w-64 h-9 px-2 text-sm' />
                <button className='w-24 h-9 rounded-md bg-blue-600 text-white'>Subscribe</button>
            </div>
        </div>
      </div>
      <p className='text-white/50 text-xs md:text-sm text-center py-4'>Copyright © 2025 LMS. All rights reserved.</p>
    </footer>
  )
}

export default Footer