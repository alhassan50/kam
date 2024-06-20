import React from 'react'

function Logo() {
  return (
    <div className='flex items-center gap-3'>
        {/* Hamburger menu */}
        <figure className='w-8 h-8 group relative cursor-pointer'>
            <svg viewBox="0 0 21 21" className='w-full h-full fill-primary opacity-100 group-hover:opacity-0 transition-all duration-300 absolute top-[50%] translate-y-[-50%]' xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 6.5h12"/><path d="m4.498 10.5h11.997"/><path d="m4.5 14.5h11.995"/></g></svg>

            <svg viewBox="0 0 32 32" className='w-6 h-6 fill-primary opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]' xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M16.88,15.53,7,5.66A1,1,0,0,0,5.59,7.07l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.42,0l9.61-9.61A.85.85,0,0,0,16.88,15.53Z"/><path d="M26.46,15.53,16.58,5.66a1,1,0,0,0-1.41,1.41l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.41,0l9.62-9.61A.85.85,0,0,0,26.46,15.53Z"/></g></svg>
        </figure>
        
        {/* logo */}
        <figure>
            <h3 className='font-medium'>
                KAM LOGO
            </h3>
        </figure>
    </div>
  )
}

export default Logo