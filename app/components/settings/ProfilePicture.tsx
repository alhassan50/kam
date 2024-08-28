'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { User } from 'firebase/auth';

const ProfilePicture: React.FC<{ user: User }> = ({ user }) => {
  const [profilePic, setProfilePic] = useState<string | null>(user.photoURL || null);
  const [loading, setLoading] = useState(!user.photoURL);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user.photoURL) {
      const fetchProfilePic = async () => {
        try {
          /* const storage = getStorage();
          const picRef = ref(storage, 'profile_pics/default.jpg');
          const url = await getDownloadURL(picRef); */
          const url = null;
          setProfilePic(url);
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfilePic();
    } else {
      setLoading(false);
    }
  }, [user.photoURL]);

  const handleProfilePicClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
    }
  };

  return (
    <div className="profile-picture flex justify-center items-center mb-6">
      {loading ? (
        <div className='w-40 h-40 rounded-full bg-tertiary animate-pulse'></div>
      ) : (
        profilePic ? 
          <Image width={160} height={160} src={profilePic} alt="Profile" className="rounded-full" />
          :
          <button 
            className='w-40 h-40 group p-10 rounded-full bg-tertiary relative overflow-hidden' 
            type='button' 
            onClick={handleProfilePicClick}
          >
            <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <rect fill="none" className='w-full h-full'/>
              <circle cx="128" cy="96" fill="none" r="64" stroke="#000" strokeMiterlimit="10" strokeWidth="16"/>
              <path d="M31,216a112,112,0,0,1,194,0" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
            </svg>
            <div className='absolute text-white opacity-0 transition-all duration-150 group-hover:opacity-100 w-full h-full rounded-full bg-[#000000c5] left-0 right-0 bottom-0 top-0 flex justify-center items-center'>
              Update Pic
            </div>
          </button>
      )}
      <input 
        title='Profile Pic'
        type="file" 
        ref={fileInputRef} 
        className='hidden'
        accept="image/*" 
        onChange={handleFileChange} 
      />
    </div>
  );
};

export default ProfilePicture;
