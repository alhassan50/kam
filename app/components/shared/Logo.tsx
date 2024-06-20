import React from 'react'

function Logo() {
  return (
    <div className='flex items-center gap-3'>
        {/* Hamburger menu */}
        <figure className='w-8 h-8'>
            <svg viewBox="0 0 21 21" className='w-full h-full' xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 6.5h12"/><path d="m4.498 10.5h11.997"/><path d="m4.5 14.5h11.995"/></g></svg>
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