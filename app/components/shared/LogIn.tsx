'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CloseModal from "../my-tutor/CloseModal";
import { useForm, SubmitHandler } from "react-hook-form";
import Arrow from "../shared/Arrow";
import Link from "next/link";
import { Alert, CircularProgress } from "@mui/material"; // Assuming you're using Material UI for alerts
import { useDispatch } from "react-redux";
import { toggleAuthState } from "@/app/redux/slices/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseClient";

type LogInFormData = {
    logInEmailAddress: string;
    logInPassword: string;
};

function LogIn({ closeModal }: { closeModal?: () => void }) {
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect');
    const dispatch = useDispatch();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    console.log(closeModal);    

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        clearErrors,
        reset
    } = useForm<LogInFormData>({
        defaultValues: {
            logInEmailAddress: '',
            logInPassword: ''
        }
    });

    const clearFieldError = (fieldName: keyof LogInFormData, value: string) => {
        setValue(fieldName, value);
        clearErrors(fieldName);
    }

    const onSubmit: SubmitHandler<LogInFormData> = async (data) => {
        setErrorMessage(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.logInEmailAddress, data.logInPassword);
            const idToken = await userCredential.user.getIdToken();
            const user = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL,
                phoneNumber: userCredential.user.phoneNumber
            };

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idToken, user })
            });

            if (response.ok) {
                const result = await response.json();
                //console.log('Login successful:', result);
                reset();
                setIsRedirecting(true);
                
                if (closeModal) closeModal();

                if (redirectUrl) {
                    router.replace(redirectUrl);
                } else {
                    router.back();
                }

                dispatch(toggleAuthState());
            } else {
                const errorData = await response.json();
                console.error('Login error:', errorData.error);
                setErrorMessage(errorData.error);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };
    

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const closeDialogue = () => {
        if (closeModal) closeModal();
        setErrorMessage(null);
        reset();
        router.back();
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const goToSignUp= () => {
        router.replace('/signup');
    }

    useEffect(() => {
        // Any additional logic based on isRedirecting
    }, [isRedirecting]);

    return (
        <div className="flex justify-center items-center w-full">
            <div className="max-w-[500px] mx-auto p-5 bg-secondary rounded">
                {
                    isRedirecting 
                     ?  <div className="text-primary text-center">
                            <CircularProgress color="inherit" />
                            <p>Hang tight! We are redirecting you</p>
                        </div>
                     :  <div>
                            <div className="flex items-center gap-10 justify-between">
                                <h3 className="text-primary">
                                    Log in
                                </h3>
                                {closeModal && <CloseModal closeDialogue={closeDialogue} />}
                            </div>
                            <p className="text-[14px] mt-3 text-primary">
                                Please log in for full access to your personalized tutor and take practice tests.
                            </p>
                            <div className='mt-6'>
                                <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                                    <div className="grid gap-5">
                                        <div className="grid grid-flow-row gap-1 min-w-0 text-[14px]">
                                            <label htmlFor="logInEmailAddress" className="text-primary">
                                                Email Address
                                            </label>
                                            <input 
                                                type="email"
                                                placeholder="abc@gmail.com"
                                                className={`px-5 py-2 border-[var(--bg-card)] border min-w-0 rounded-[4px]`}
                                                {...register("logInEmailAddress", {
                                                    required: "Your email address is required",
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                                        message: "Please enter a valid email address"
                                                    }
                                                })}
                                                id="logInEmailAddress"
                                                onChange={(e) => clearFieldError("logInEmailAddress", e.target.value)}
                                            />
                                            <p className="text-[12px] text-red-600">{errors?.logInEmailAddress?.message}</p>
                                        </div>
                                        
                                        <div className="grid grid-flow-row gap-1 min-w-0 text-[14px]">
                                            <label htmlFor="logInPassword" className="text-primary">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    type={passwordVisible ? "text" : "password"}
                                                    placeholder="At least 8 characters"
                                                    className={`px-5 py-2 border-[var(--bg-card)] border min-w-0 rounded-[4px] w-full`}
                                                    {...register("logInPassword", {
                                                        required: "Your password is required",
                                                        pattern: {
                                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                                                            message: "Your password must contain at least 8 characters including numbers and letters or special characters"
                                                        }
                                                    })}
                                                    id="logInPassword"
                                                    onChange={(e) => clearFieldError("logInPassword", e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute inset-y-0 right-0 flex items-center px-2 text-[14px] text-gray-600"
                                                >
                                                    {passwordVisible ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                            <p className="text-[12px] text-red-600">{errors?.logInPassword?.message}</p>
                                        </div>
        
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`btn-primary group flex justify-center items-center gap-2 mt-1 ${isSubmitting && 'hover:bg-black cursor-not-allowed'}`}
                                        >
                                            {isSubmitting ? <CircularProgress color='inherit' size={20} /> : 
                                                <>
                                                    Log In
                                                    <div className="group-hover:translate-x-1 transition-all duration-150">
                                                        <Arrow width={24} />
                                                    </div>
                                                </>
                                            }
                                        </button>
                                    </div>

                                    {
                                        closeModal 
                                            ? <p className="text-[12px] text-primary text-center">Don&apos;t have an account? <button type="button" onClick={() => goToSignUp()} className="underline">Sign up</button></p>
                                            : <p className="text-[12px] text-primary text-center">Already have an account? <Link href={'/signup'} className="underline">Log in</Link></p> 
                                    }
                                </form>
                            </div>
                        </div> 
                }
            </div>
        </div>
    );
}

export default LogIn;
