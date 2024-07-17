'use client'

import { useEffect, useRef, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import CloseModal from "../my-tutor/CloseModal"
import { useForm, SubmitHandler } from "react-hook-form";
import Arrow from "../shared/Arrow";
import Link from "next/link";

function SignUp() {
    const searchParams = useSearchParams()
    const showDialogue = searchParams.get('signup')

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            emailAddress: '',
            password: '',
            acceptTerms: false
        }
    });

    /* const clearFieldError = (fieldName: keyof SignUpFormData, value: string) => {
        setValue(fieldName, value);
        clearErrors(fieldName);
    } */

    const clearFieldError = (fieldName: keyof SignUpFormData, value: string | boolean) => {
        setValue(fieldName, value);
        clearErrors(fieldName);
    }

    const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
        console.log(data); // Handle form submission here
        closeDialgue()
    };

    const router = useRouter()
    const dialogueRef = useRef<null | HTMLDialogElement>(null)

    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        if (showDialogue && showDialogue === 'y') dialogueRef.current?.showModal()
        else dialogueRef.current?.close()
    }, [showDialogue])

    const closeDialgue = () => {
        dialogueRef.current?.close()
        const currentParams = new URLSearchParams(window.location.search)
        currentParams.delete('signup')
        const newUrl = `${window.location.pathname}?${currentParams.toString()}`
        router.replace(newUrl)
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <dialog ref={dialogueRef} className="overflow-hidden px-3">
                <div className="signup blur-bg-4 backdrop-blur-sm fixed px-2 inset-0 flex justify-center items-center bg-[var(--modal-bg)] z-[100000000000]">
                    <div className="max-w-[500px] mx-auto p-5 bg-secondary rounded overflow-y-auto max-h-[90vh]">
                        <div>
                            <div className="flex items-center gap-10 justify-between">
                                <h3 className="text-primary">
                                    Sign Up
                                </h3>
                                <CloseModal closeDialgue={closeDialgue} />
                            </div>
                            <p className="text-[14px] mt-3 text-primary">
                                Create an account to get full access to your personalized tutor and take practice tests.
                            </p>
                            <div className='mt-6'>
                                <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                                            className="btn-primary flex justify-center items-center gap-2 mt-1"
                                        >
                                            Sign Up
                                            <Arrow width={24} />
                                        </button>
                                    </div>

                                    <p className="text-[12px] text-primary text-center">Already have an account? <Link href={'?signup=y'} className="underline">Log in</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </Suspense>

    )
}

export default SignUp
