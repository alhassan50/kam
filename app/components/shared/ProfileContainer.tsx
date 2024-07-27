'use client';

import { useState, useEffect, useRef } from 'react';
import Profile from './Profile';
import Link from 'next/link';
import { menuItems } from '@/app/data/profileMenuItems';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectHasAccountInfoChanged } from '@/app/redux/slices/accountInfoSlice';

function ProfileContainer() {
  const [isProfileMenuOpened, setIsProfileMenuOpened] = useState<boolean>(false);
  const [user, setUser] = useState<{ displayName: string; email: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const profileRef = useRef<HTMLDivElement>(null);
  const hasAccountInfoChanged = useSelector(selectHasAccountInfoChanged);

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

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ displayName: user.displayName || '', email: user.email || '' });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [hasAccountInfoChanged]);

  return (
    <div ref={profileRef} className='relative h-full flex justify-center items-center'>
      <Profile toggleProfileMenu={toggleProfileMenu} />

      {isProfileMenuOpened && (
        <div className='profile-menu absolute right-0 text-nowrap min-w-[200px] text-[12px] top-[110%] p-2 border border-[var(--bg-card)] bg-primary rounded grid shadow-lg'>
          <div>
            {
              loading ? 
              (<div className='flex justify-center items-center py-2'>
                  <CircularProgress />
                </div>)
                : 
              (<div>
                  <div className="p-2 flex flex-col gap-1">
                  <span className='whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]' >{user?.displayName}</span>
                  <span className='whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]'>{user?.email}</span>
                </div>
                {user?.email &&  <hr className='my-1 border border-[var(--bg-card)]' />}
                </div>)
            }
            {menuItems.map((item, index) => (
              <div key={index}>
                {index === menuItems.length - 1 && <hr className='my-1 border border-[var(--bg-card)]' />}
                <Link
                  href={item.href}
                  className='p-2 hover:bg-[var(--hover-card)] rounded flex items-center gap-2'
                  title={item.label}
                  onClick={() => toggleProfileMenu()}
                >
                  <figure>{item.svg}</figure>
                  <h3>{item.label}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileContainer;
