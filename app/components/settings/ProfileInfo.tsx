'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { getAuth, updateProfile, updatePassword, User } from 'firebase/auth';
import { Alert, CircularProgress } from '@mui/material';
import { toggleAccountInfoState } from '@/app/redux/slices/accountInfoSlice';
import { useDispatch } from "react-redux";

// Define the structure of form data
interface FormData {
  displayName: string;
  email: string;
}

// Define the initial state of the form
const initialFormData: FormData = {
  displayName: '',
  email: '',
};

const ProfileInfo: React.FC<{ user: User }> = ({ user }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [originalData, setOriginalData] = useState<FormData>(initialFormData);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        email: user.email || ''
      });
      setOriginalData({
        displayName: user.displayName || '',
        email: user.email || ''
      });
    }

  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      setIsChanged(JSON.stringify(updated) !== JSON.stringify(originalData));
      return updated;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    if (user) {
      const { displayName } = formData;

      try {
        // Update profile information
        if (displayName !== user.displayName) {
          await updateProfile(user, { displayName });
        }

        // Update original data to match the new data
        setOriginalData(formData);
        setIsChanged(false);
        dispatch(toggleAccountInfoState());
      } catch (error) {
        setError('Error saving changes. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mx-auto">
      <h2 className="mb-4">Account Information</h2>
      {error && <div className='fixed top-[10%] left-[40%] shadow-lg'><Alert severity="error" onClose={() => setError(null)}>{error}</Alert></div>}
      <form className="grid gap-3">
        <div className='grid grid-flow-row gap-1 min-w-0 text-[14px]'>
          <label htmlFor="displayName" className="text-primary">
            Full Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="Full Name"
            className='px-4 py-2 border-[var(--bg-card)] border min-w-0 rounded-[4px]'
          />
        </div>

        <div className='grid grid-flow-row gap-1 min-w-0 text-[14px]'>
          <label htmlFor="email" className="text-primary">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled={true}
            placeholder="Email"
            className='px-4 py-2 border-[var(--bg-card)] border min-w-0 rounded-[4px] cursor-not-allowed'
          />
        </div>

        <button
          type="button"
          disabled={!isChanged || loading}
          onClick={handleSubmit}
          className={`mt-4 relative flex justify-center text-base items-center ${
            isChanged && !loading
              ? 'btn-primary'
              : 'btn-primary-disabled cursor-not-allowed'
          }`}
        >
          {loading ? (
            <CircularProgress color='inherit' size={24} className="" />
          ) : (
            'Save Changes'
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
