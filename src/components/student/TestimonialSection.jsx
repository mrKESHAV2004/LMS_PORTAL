import React from 'react'
import { assets } from '../../assets/assets'
import { dummyTestimonial } from '../../assets/assets'
const TestimonialSection = () => {
  return (
    <div className='pb-14 px-8 md:px-0'>
        <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
        <p className='md:text-base text-sm text-gray-500 mt-3'>Hear from our Learner as they share their journey of transformation,success and how our <br />plateform has made chnages in their lives</p>
        <div className='grid grid-framework gap-8 mt-14'>
            {dummyTestimonial.map((testimonial,index)=>(
                <div key={index} className='text-sm text-left border border-gray-500/30 rounded-lg pb-6 bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden'>
                    <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
                        <img src={testimonial.image} alt="" className='h-12 w-12 rounded-full' />
                        <div>
                            <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
                            <p className='text-gray-800/80'>{testimonial.role}</p>
                        </div>
                    </div>
                    
                        <div className='p-5 pb-7'>
                            <div className='gap-0.5 flex'>
                                {[...Array(5)].map((_,index)=>(
                                  <img className='h-5' key={index} src={index < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt="" className='w-3.5 h-3.5' />  
                                ))}
                            </div>
                            <p className='text-gray-500 mt-5'>{testimonial.feedback}</p>
                        </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TestimonialSection