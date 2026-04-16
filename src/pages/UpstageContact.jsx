import React from 'react'
import { assets } from '../assets/assets'

const UpstageContact = () => {
  return (
    <div>
       <div className='text-center text-xl md:text-2xl pt-6 md:pt-10 text-gray-500'>
          <p>CONTACT <span className='text-gray-700 font-semibold'>UPSTAGE</span></p>
        </div>

       <div className='my-10 flex flex-col md:flex-row gap-8 md:gap-10 px-4 md:px-0 text-sm'>
         <img className='w-full rounded-lg md:max-w-[360px]'  src={assets.contact_image}  alt="" />

         <div className='flex flex-col gap-6 text-center md:text-left'>
            <p className='font-semibold text-lg text-gray-600'>Our Office</p>
            <p className='text-gray-500'>Upstage Hospital, India</p>
            <p className='text-gray-500'>Phone: 1234567890</p>
          </div>
        </div>
    </div>
  )
}

export default UpstageContact