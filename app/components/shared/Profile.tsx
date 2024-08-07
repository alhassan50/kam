import React from 'react'

function Profile({toggleProfileMenu}: {toggleProfileMenu: () => void}) {
  return (
    <button 
      type='button'
      title='Profile'
      onClick={toggleProfileMenu}
      className='rounded-[50%] overflow-hidden h-full'
    >
      <figure className='w-9 h-9 p-2  bg-tertiary'>            
          <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" className='w-full h-full'/><circle cx="128" cy="96" fill="none" r="64" stroke="#000" strokeMiterlimit="10" strokeWidth="16"/><path d="M31,216a112,112,0,0,1,194,0" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
      </figure>
    </button>
  )
}

export default Profile