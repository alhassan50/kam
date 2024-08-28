'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleAuthState } from "@/app/redux/slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseClient";

function LogOut() {
    const searchParams = useSearchParams();
    const showDialogue = searchParams.get('logout');
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to manage error messages
    const [open, setOpen] = useState(false); // State to manage confirmation dialog

    const protectedRoutes = ['/my-tutor', '/my-tutor/:path*', '/take-assessment/:path*', '/settings/:path*'];

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });
            if (response.ok) {
                dispatch(toggleAuthState()); // Update auth state
                setLoading(false); // Stop loading indicator
                closeDialogue(); // Close dialogue
                // Check if the current path is a protected route
                const currentPath = window.location.pathname;
                if (protectedRoutes.some(route => new RegExp(`^${route.replace(':path*', '.*')}$`).test(currentPath))) {
                    router.replace('/');
                }
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
        setOpen(false);
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.delete('logout');
        const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
        router.replace(newUrl);
    };

    useEffect(() => {
        if (showDialogue && showDialogue === 'y') {
            setOpen(true);
        }
    }, [showDialogue]);

    const handleConfirm = () => {
        setOpen(false);
        handleLogout();
    };

    const handleCancel = () => {
        closeDialogue();
    };

    return (
        <>
            <Dialog open={open} onClose={handleCancel}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Log Out
                    </Button>
                </DialogActions>
            </Dialog>

            {loading && (
                <div className="login blur-bg-4 backdrop-blur-sm fixed overflow-y-auto py-20 px-2 flex justify-center items-center w-screen min-h-screen top-0 left-0 bg-[var(--modal-bg)] z-[100000000000]">
                    <div className="max-w-[500px] mx-auto p-5 bg-secondary rounded">
                        <div className='mt-6 flex flex-col text-primary justify-center items-center gap-2'>
                            <>
                                <CircularProgress color='inherit' size={24} />
                                <h3 className="text-primary text-center">
                                    Logging you out. <br /> Please do not refresh the page!
                                </h3>
                            </>
                        </div>
                    </div>
                </div>
            )}

            {errorMessage && (
                <Alert severity="error" onClose={() => setErrorMessage(null)}>{errorMessage}</Alert>
            )}
        </>
    );
}

export default LogOut;
