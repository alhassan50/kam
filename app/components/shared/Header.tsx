import React from 'react'
import TitleBar from './TitleBar'
import Logo from './Logo'
import Profile from './Profile'

function Header() {
  return (
    <header className='border-tertiary border-b'>
        <div className='flex justify-between items-center p-4 py-2'>
            <Logo />
            <TitleBar />
            
            <div className='flex items-center gap-3'>
                <button 
                    type='button'
                    className='bg-primary text-secondary px-4 py-1 rounded-[4px]'
                >
                    Go Premium
                </button>

                {/* <button
                    type='button'
                    className='hover:underline '
                >
                    Sign In
                </button> */}
                
                <Profile />
            </div>
        </div>
    </header>
  )
}

export default Header