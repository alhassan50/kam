'use client'

import { useEffect, useRef, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import CloseModal from "../my-tutor/CloseModal"
import { useForm, SubmitHandler } from "react-hook-form";
import Arrow from "../shared/Arrow";
import Link from "next/link";

function LogIn() {
    const searchParams = useSearchParams()
    const showDialogue = searchParams.get('login')

    const {
        register,
        handleSubmit,
        formState: { errors },
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

    const onSubmit: SubmitHandler<LogInFormData> = (data) => {
        console.log(data); // Handle form submission here
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
        currentParams.delete('login')
        const newUrl = `${window.location.pathname}?${currentParams.toString()}`
        router.replace(newUrl)
        reset()
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <dialog ref={dialogueRef}>
            <div className="login blur-bg-4 backdrop-blur-sm fixed overflow-y-auto py-20 px-2 flex justify-center items-center w-screen min-h-screen top-0 left-0 bg-[var(--modal-bg)] z-[100000000000]">
                <div className="max-w-[500px] mx-auto p-5 bg-secondary rounded">
                    <div>
                        <div className="flex items-center gap-10 justify-between">
                            <h3 className="text-primary">
                                Log in
                            </h3>
                            <CloseModal closeDialgue={closeDialgue} />
                        </div>
                        <p className="text-[14px] mt-3 text-primary">
                            Please log in for full access to your personalized tutor and take practice tests.
                        </p>
                        <div className='mt-6'>
                            <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                                        className="btn-primary group flex justify-center items-center gap-2 mt-1"
                                    >
                                        Log In
                                        <div className="gro group-hover:translate-x-1 transition-all duration-150">
                                            <Arrow width={24} />
                                        </div>
                                    </button>
                                </div>

                                <p className="text-[12px] text-primary text-center">Don&apos;t have an account? <Link href={'?signup=y'} className="underline">Sign up</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default LogIn
