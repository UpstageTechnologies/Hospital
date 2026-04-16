import React from 'react'
import { assets } from '../assets/assets'

const UpstageAbout = () => {
  return (
    <div>
       <div className='text-center text-xl md:text-2xl pt-6 md:pt-10 text-gray-500'>
          <p>ABOUT <span className='text-gray-700 font-medium'>UPSTAGE</span></p>
        </div>

       <div className='my-10 flex flex-col md:flex-row gap-8 md:gap-12 px-4 md:px-0'>
         <img className='w-full rounded-lg md:max-w-[360px]'  src={assets.about_image}  alt="" />
         <div className='flex flex-col justify-center gap-6 md:w-2/3 text-sm text-gray-600 text-center md:text-left'>
            <p>Welcome to Upstage, your trusted hospital management platform.</p>
            <p>We provide seamless doctor booking and healthcare management.</p>
            <b className='text-gray-800'>Our Vision</b>
            <p>To simplify healthcare access for everyone.</p>
          </div>
        </div>
    </div>
  )
}

export default UpstageAbout