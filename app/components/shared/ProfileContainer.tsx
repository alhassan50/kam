'use client';

import { useState, useEffect, useRef } from 'react';
import Profile from './Profile';
import Link from 'next/link';
import { menuItems } from '@/app/data/profileMenuItems';

function ProfileContainer() {
  const [isProfileMenuOpened, setIsProfileMenuOpened] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpened((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setIsProfileMenuOpened(false);
    }
  };

  useEffect(() => {
    if (isProfileMenuOpened) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpened]);

  return (
    <div ref={profileRef} className='relative h-full'>
      <Profile toggleProfileMenu={toggleProfileMenu} />

      {isProfileMenuOpened && (
        <div className='profile-menu absolute right-0 text-nowrap min-w-[200px] text-[12px] top-[110%] p-2 border border-[var(--bg-card)] bg-primary rounded grid shadow-lg'>
          {menuItems.map((item, index) => (
            <>
                {index === menuItems.length-1 &&
                    <hr className='my-1 border border-[var(--bg-card)]' />
                }
                <Link 
                    key={index} 
                    href={item.href} 
                    className='p-2 hover:bg-[var(--hover-card)] rounded flex items-center gap-2'
                    title={item.label}
                    onClick={() => toggleProfileMenu()}
                >
                    <figure>{item.svg}</figure>
                    <h3>{item.label}</h3>
                </Link>
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileContainer;
