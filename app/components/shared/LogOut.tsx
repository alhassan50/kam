'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleAuthState } from "@/app/redux/slices/authSlice";

function LogOut() {
    const searchParams = useSearchParams();
    const showDialogue = searchParams.get('logout');
    const dispatch = useDispatch();
    const router = useRouter();
    const dialogueRef = useRef<null | HTMLDialogElement>(null);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to manage error messages

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await fetch('/api/auth/logout', {
                    method: 'POST',
                });
    
                if (response.ok) {
                    dispatch(toggleAuthState()); // Update auth state
                    setLoading(false); // Stop loading indicator
                    closeDialogue(); // Close dialogue
                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.error || 'An unexpected error occurred');
                    setLoading(false); // Stop loading indicator
                }
            } catch (error) {
                console.error('Error during logout:', error);
                setErrorMessage('Failed to log out. Please try again.');
                setLoading(false); // Stop loading indicator
            }
        };

        const closeDialogue = () => {
            dialogueRef.current?.close();
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.delete('logout');
            const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
            router.replace(newUrl);
        };

        if (showDialogue && showDialogue === 'y') {
            dialogueRef.current?.showModal();
            // Perform logout API request when dialog opens
            handleLogout();
        } else {
            dialogueRef.current?.close();
        }
    }, [showDialogue, dispatch, router]);



    return (
        <dialog ref={dialogueRef}>
            <div className="login blur-bg-4 backdrop-blur-sm fixed overflow-y-auto py-20 px-2 flex justify-center items-center w-screen min-h-screen top-0 left-0 bg-[var(--modal-bg)] z-[100000000000]">
                <div className="max-w-[500px] mx-auto p-5 bg-secondary rounded">
                    <div className='mt-6 flex flex-col justify-center items-center gap-2'>
                        {loading ? (
                            <>
                                <CircularProgress size={24} />
                                <h3 className="text-primary text-center">
                                    Logging you out. <br /> Please do not refresh the page!
                                </h3>
                            </>
                        ) : (
                            errorMessage && <Alert severity="error">{errorMessage}</Alert>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default LogOut;
