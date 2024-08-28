import React from 'react';
import Profile from '@/app/components/settings/Profile';
import ChangePassword from '@/app/components/settings/ChangePassword';
import ChatList from '@/app/components/settings/ChatList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings'
};

const Settings = async () => {
  return (
    <main className="">
      <div>
        <Profile />
        <hr className='my-6 border border-[var(--bg-card)]' />
        <ChangePassword />
        <hr className='my-6 border border-[var(--bg-card)]' />
        <ChatList />
      </div>
    </main>
  );
};

export default Settings;
