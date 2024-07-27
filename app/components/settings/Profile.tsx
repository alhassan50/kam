// src/app/components/settings/Profile.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import ProfilePicture from '@/app/components/settings/ProfilePicture';
import ProfileInfo from '@/app/components/settings/ProfileInfo';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setError('User not authenticated');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <ProfilePicture user={user} />
      <ProfileInfo user={user} />
    </div>
  );
};

export default Profile;
