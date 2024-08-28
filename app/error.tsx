'use client' // Error components must be Client Components
 
import LayoutError from '@/app/components/shared/LayoutError'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <main className='grid justify-center items-center gap-3 h-full'>
        <div>
            <LayoutError errorType='default' />
            <button
              type='button'
                onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
                }
                className='mt-4 btn-secondary bg-primary hover:bg-secondary hover:text-primary border border-primar y transition-all duration-150 text-sm text-secondary px-4 py-2 font-medium rounded-[4px]'
            >
                Or Try again Now
            </button>
        </div>
    </main>
  )
}