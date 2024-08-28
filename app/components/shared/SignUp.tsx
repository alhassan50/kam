'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CloseModal from "../my-tutor/CloseModal";
import { useForm, SubmitHandler } from "react-hook-form";
import Arrow from "../shared/Arrow";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseClient";
import { Alert, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleAuthState } from "@/app/redux/slices/authSlice";

type SignUpFormData = {
    fullName: string;
    emailAddress: string;
    password: string;
    acceptTerms: boolean;
};

function SignUp({ closeModal }: { closeModal?: () => void }) {
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [sessionErrorMessage, setSessionErrorMessage] = useState<boolean>(false);
    const [showStatus, setShowStatus] = useState(false);
    const redirectUrl = searchParams.get('redirect');
    const dispatch = useDispatch();
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        clearErrors,
        reset
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            emailAddress: '',
            password: '',
            acceptTerms: false
        }
    });

    const clearFieldError = (fieldName: keyof SignUpFormData, value: string | boolean) => {
        setValue(fieldName, value);
        clearErrors(fieldName);
    };

    const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
        setErrorMessage(null);
        try {
            const res = await createUserWithEmailAndPassword(auth, data.emailAddress, data.password);
            await updateProfile(res.user, { displayName: data.fullName });
            const idToken = await res.user.getIdToken();

            setShowStatus(true); // Show status message

            try {
                const response = await fetch('/api/signUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idToken }),
                });

                if (response.ok) {
                    dispatch(toggleAuthState());
                    reset();
                    if (redirectUrl) {
                        if (closeModal) closeModal();
                        setIsRedirecting(true);
                        router.replace(redirectUrl);
                    } else {
                        if (closeModal) closeModal();
                        router.back();
                    }
                    setShowStatus(false);
                } else {
                    throw new Error('Failed to create session');
                }
            } catch (error) {
                setSessionErrorMessage(true);
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const closeDialogue = () => {
        if (closeModal) closeModal();
        setErrorMessage(null);
        reset();        
        router.back();
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const goToLogIn = () => {
        router.replace('/logIn');
    }

    return (
        <div className="max-w-[500px] mx-auto p-5 bg-secondary rounded overflow-y-auto max-h-[90vh]">
            <div>
                {!showStatus && (
                    <>
                        <div className="flex items-center gap-10 justify-between">
                            <h3 className="text-primary">Sign Up</h3>
                            { closeModal && <CloseModal closeDialogue={closeDialogue} />}
                        </div>
                    
                        <p className="text-[14px] mt-3 text-primary">
                            Create an account to get full access to your personalized tutor and take practice tests.
                        </p>
                    </>)}
                <div className='mt-6'>
                    {showStatus ? (
                        <div className="flex flex-col text-primary items-center">
                            {
                                sessionErrorMessage  
                                    ?   <>
                                            <h3>Oops! <br /> Failed to login. You&apos;d have to do it yourself.</h3>
                                            <Link href={'?login=y'} className="btn-primary w-full flex justify-center items-center mt-4">
                                                Log In Now
                                            </Link>
                                        </>
                                    :   <>
                                            <CircularProgress color='inherit' size={24} />
                                            <p className="mt-2 text-primary">We are logging you in. Please wait...</p>
                                        </>
                            }
                        </div>
                    ) : (
                        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            <div className="grid gap-5">
                                <div className="grid grid-flow-row gap-1 min-w-0 text-[14px]">
                                    <label htmlFor="fullName" className="text-primary">
                                        Full Name
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="John Doe"
                                        className={`px-5 py-2 border-[var(--bg-card)] border min-w-0 rounded-[4px]`}
                                        {...register("fullName", {
                                            required: "Your full name is required"
                                        })}
                                        id="fullName"
                                        onChange={(e) => clearFieldError("fullName", e.target.value)}
                                    />
                                    <p className="text-[12px] text-red-600">{errors?.fullName?.message}</p>
                                </div>

                                <div className="grid grid-flow-row gap-1 min-w-0 text-[14px]">
                                    <label htmlFor="emailAddress" className="text-primary">
                                        Email Address
                                    </label>
                                    <input 
                                        type="email"
                                        placeholder="abc@gmail.com"
                                        className={`px-5 py-2 border-[var(--bg-card)] border min-w-0 rounded-[4px]`}
                                        {...register("emailAddress", {
                                            required: "Your email address is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                                message: "Please enter a valid email address"
                                            }
                                        })}
                                        id="emailAddress"
                                        onChange={(e) => clearFieldError("emailAddress", e.target.value)}
                                    />
                                    <p className="text-[12px] text-red-600">{errors?.emailAddress?.message}</p>
                                </div>

                                <div className="grid grid-flow-row gap-1 min-w-0 text-[14px]">
                                    <label htmlFor="password" className="text-primary">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type={passwordVisible ? "text" : "password"}
                                            placeholder="At least 8 characters"
                                            className={`px-5 py-2 border-[var(--bg-card)] border min-w-0 rounded-[4px] w-full`}
                                            {...register("password", {
                                                required: "Your password is required",
                                                pattern: {
                                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                                                    message: "Your password must contain at least 8 characters including numbers and letters or special characters"
                                                }
                                            })}
                                            id="password"
                                            onChange={(e) => clearFieldError("password", e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 flex items-center px-2 text-[14px] text-gray-600"
                                        >
                                            {passwordVisible ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    <p className="text-[12px] text-red-600">{errors?.password?.message}</p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="checkbox"
                                            {...register("acceptTerms", {
                                                required: "You must accept our terms and conditions"
                                            })}
                                            id="acceptTerms"
                                            className="ac accent-primary"
                                        />
                                        <label htmlFor="acceptTerms" className="text-primary text-[14px]">
                                            I accept the terms and conditions
                                        </label>
                                    </div>
                                    <p className="text-[12px] text-red-600">{errors?.acceptTerms?.message}</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`btn-primary group flex justify-center items-center gap-2 mt-1 ${isSubmitting && 'hover:bg-black cursor-not-allowed'}`}
                                >
                                    {isSubmitting ? <CircularProgress color='inherit' size={20} /> : 
                                        <>
                                            Sign Up
                                            <div className="gro group-hover:translate-x-1 transition-all duration-150">
                                                <Arrow width={24} />
                                            </div>
                                        </>
                                    }
                                </button>
                            </div>
                            
                            {
                                closeModal 
                                    ? <p className="text-[12px] text-primary text-center">Already have an account? <button type="button" onClick={() => goToLogIn()} className="underline">Log in</button></p>
                                    : <p className="text-[12px] text-primary text-center">Already have an account? <Link href={'/login'} className="underline">Log in</Link></p> 
                            }
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignUp;

