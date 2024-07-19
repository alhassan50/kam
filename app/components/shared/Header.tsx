import React from 'react'
import TitleBar from './TitleBar'
import Logo from './Logo'
import Profile from './Profile'
import ProfileContainer from './ProfileContainer'
import Link from 'next/link'
import Auth from './Auth'

function Header() {
  return (
    <header className='border-tertiary border-b sticky top-0 z-[1000] bg-sideBarBg'>
        <div className='flex justify-between items-center px-4 py-2'>
            <Logo />
            <TitleBar />
            
            <div className='flex items-center gap-3'>
                <Link 
                    href='/go-premium'
                    className='bg-primary hover:bg-secondary hover:text-primary border border-primar y transition-all duration-150 text-sm text-secondary px-4 py-2 font-medium rounded-[4px] hidden md:block'
                >
                    Go Premium
                </Link>

                <Auth />
            </div>
        </div>
    </header>
  )
}

export default Header