'use client'

import { useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import SlidesDropzone from "./SlidesDropzone"
import CloseModal from "./CloseModal"
import SlidesDescription from "./SlidesDescription"

function NewChat() {
    const searchParams = useSearchParams()
    const showDialogue = searchParams.get('isNewChat')

    const router = useRouter()

    const dialogueRef = useRef<null | HTMLDialogElement>(null)

    useEffect(()=>{
        if (showDialogue && showDialogue === 'y') dialogueRef.current?.showModal()
        else dialogueRef.current?.close()
    }, [showDialogue])
    
    const closeDialgue = () => {
        dialogueRef.current?.close()
        // Remove 'isNewChat' from the URL without navigating away
        const currentParams = new URLSearchParams(window.location.search)
        currentParams.delete('isNewChat')
        const newUrl = `${window.location.pathname}?${currentParams.toString()}`
        router.replace(newUrl)
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <dialog ref={dialogueRef}>
                <div className="blur-bg-4 backdrop-blur-sm fixed overflow-y-auto py-20 px-2 flex justify-center items-center w-screen min-h-screen top-0 left-0 bg-[var(--modal-bg)] z-[100000000000]">
                    <div className="p-5 bg-secondary rounded max-w-[600px]">
                        <div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-primary">
                                        New Chat
                                    </h3>

                                    <CloseModal closeDialgue={closeDialgue} />
                                </div>
                                <p className="text-[12px] mt-2 text-primary">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dicta repudiandae officiis sapiente hic minus voluptatem quia minima distinctio.
                                </p>
                            </div>

                            <div className="h-[] my-3 grid gap-2">
                                <SlidesDropzone className="border hover:bg-hoverPrimary cursor-pointer text-primary border- border-dashed border-primary rounded p-5 text-center" />

                                <div className="relative text-center">
                                    <hr className="absolute top-[50%] w-full translate-y-[50%] left-0 z-10" />
                                    <p className="px-3 text-[12px] bg-secondary z-20 inline-block relative text-primary">
                                        OR
                                    </p>
                                </div>

                            <SlidesDescription />
                            </div>

                            <div className="flex justify-end gap-1 flex-col sm:flex-row">
                                <button 
                                    type='button'
                                    className='bg-ghost text-primary px-4 py-2 font-medium rounded-[4px] hover:bg-hoverPrimary text-[12px]'
                                >
                                    Continue without slides
                                </button>

                                <button 
                                    type='button'
                                    className='bg-primary text-secondary px-4 py-2 font-medium rounded-[4px] text-[12px]'
                                >
                                    Upload slides
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </Suspense>
    )
}

export default NewChat