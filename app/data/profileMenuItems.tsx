export const menuItems = [
    {
      href: '#myprofile',
      svg: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          className='h-5 w-5 shrink-0'
        >
          <path
            fill='currentColor'
            fillRule='evenodd'
            d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7M10.968 14.002a1 1 0 0 1-.719 1.218C7.467 15.937 5.5 18.29 5.5 21a1 1 0 1 1-2 0c0-3.729 2.69-6.8 6.25-7.717a1 1 0 0 1 1.218.72'
            clipRule='evenodd'
          ></path>
          <path
            fill='currentColor'
            d='M17.25 15.625a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0M21.75 15.625a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0M21.75 20.125a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0M17.25 20.125a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0'
          ></path>
        </svg>
      ),
      label: 'My Profile',
    },
    {
      href: '#terms',
      svg: (
        <svg
          fill='none'
          height='20'
          strokeWidth='1.5'
          viewBox='0 0 24 24'
          width='24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19 3L5 3C3.89543 3 3 3.89543 3 5L3 19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M7 7L17 7' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
          <path d='M7 12L17 12' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
          <path d='M7 17L13 17' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      ),
      label: 'Terms of use',
    },
    {
      href: '/',
      svg: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          className='h-5 w-5 shrink-0'
        >
          <path
            fill='currentColor'
            fillRule='evenodd'
            d='M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4a1 1 0 1 1 0 2zm9.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 13H11a1 1 0 1 1 0-2h6.586l-2.293-2.293a1 1 0 0 1 0-1.414'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
      label: 'Log out',
    },
];