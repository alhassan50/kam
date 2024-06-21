import React from 'react'
import SideBarToggler from './SideBarToggler'

function Logo() {
  return (
    <div className='flex items-center gap-3'>
        {/* Hamburger menu */}
        <SideBarToggler />
        
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