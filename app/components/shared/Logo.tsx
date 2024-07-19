import React from 'react'
import SideBarToggler from './SideBarToggler'
import Link from 'next/link'

function Logo() {
  return (
    <div className='flex items-center gap-3'>
        {/* Hamburger menu */}
        <SideBarToggler />
        
        {/* logo */}
        <Link href={'/'}>
          <figure>
              <h3 className='font-medium'>
                  KAM LOGO
              </h3>
          </figure>
        </Link>
    </div>
  )
}

export default Logo