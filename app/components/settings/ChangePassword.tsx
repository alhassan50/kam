'use client';

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, CircularProgress } from "@mui/material";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseClient";

type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
};

const ChangePassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, clearErrors, watch, reset } = useForm<ChangePasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: ''
    }
  });

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState<boolean>(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearFieldError = (fieldName: keyof ChangePasswordFormData, value: string) => {
    setValue(fieldName, value);
    clearErrors(fieldName);
  };

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const user = auth.currentUser;

      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, data.currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, data.newPassword);
        reset()
        setSuccessMessage('Password changed successfully.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred while changing the password. Please try again.');
    }
  };

  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");
  const isButtonDisabled = !currentPassword || !newPassword;

  return (
    <div className="sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mx-auto">
      <h2 className="mb-4">Change Password</h2>
      {errorMessage && <div className='fixed top-[10%] left-[40%]'><Alert className="shadow-lg" severity="error" onClose={() => setErrorMessage(null)}>{errorMessage}</Alert></div>}
      {successMessage && <div className='fixed top-[10%] left-[40%]'><Alert className="shadow-lg" severity="success" onClose={() => setSuccessMessage(null)}>{successMessage}</Alert></div>}
      <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-flow-row gap-1 min-w-0 text-[14px]'>
          <label htmlFor="currentPassword" className="text-primary">
            Current Password
          </label>
          <div className="relative">
            <input
              type={currentPasswordVisible ? "text" : "password"}
              id="currentPassword"
              {...register("currentPassword", {
                required: "Your current password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: "Password must be at least 8 characters long and include numbers and letters or special characters"
                }
              })}
              placeholder="Current Password"
              className='px-4 py-2 pr-14 w-full border-[var(--bg-card)] border min-w-0 rounded-[4px]'
              onChange={(e) => clearFieldError("currentPassword", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-[14px] text-gray-600"
            >
              {currentPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <p className="text-[12px] text-red-600">{errors.currentPassword?.message}</p>
        </div>

        <div className='grid grid-flow-row gap-1 min-w-0 text-[14px]'>
          <label htmlFor="newPassword" className="text-primary">
            New Password
          </label>
          <div className="relative">
            <input
              type={newPasswordVisible ? "text" : "password"}
              id="newPassword"
              {...register("newPassword", {
                required: "Your new password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: "Password must be at least 8 characters long and include numbers and letters or special characters"
                }
              })}
              placeholder="New Password"
              className='px-4 py-2 pr-14 border-[var(--bg-card)] border min-w-0 w-full rounded-[4px]'
              onChange={(e) => clearFieldError("newPassword", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-[14px] text-gray-600"
            >
              {newPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <p className="text-[12px] text-red-600">{errors.newPassword?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled || isSubmitting}
          className={`mt-4 relative flex justify-center text-base items-center ${
            isButtonDisabled || isSubmitting
              ? 'btn-primary-disabled cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {isSubmitting ? (
            <CircularProgress color='inherit' size={24} className="" />
          ) : (
            'Change Password'
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
