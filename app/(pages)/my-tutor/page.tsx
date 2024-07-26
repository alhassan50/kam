'use client'

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SlidesDropzone from '@/app/components/my-tutor/SlidesDropzone';
import SlidesDescription from '@/app/components/my-tutor/SlidesDescription';

function MyTutor({ setSelectedChat }: { setSelectedChat: (chat: any) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [paragraphName, setParagraphName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const router = useRouter(); // Initialize the router

  const clearError = () => setError(null);

  const handleFileDrop = useCallback((acceptedFiles: File[]) => {
    clearError(); // Clear the error when a file is dropped
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParagraphName(event.target.value);
  };

  const handleUploadClick = async () => {
    setError(null);
    setLoading(true);
    setSuccess(false);

    if (file && (description || paragraphName)) {
      setError('Please upload either a file or input slides description, not both.');
      setLoading(false);
    } else if (!file && !description) {
      setError('Please provide either a file or slides description.');
      setLoading(false);
    } else {
      try {
        if (file) {
          // Prepare form data for file upload
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch('/api/extract-text', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload file.');
          }

          const result = await response.json();
          console.log('Extracted text:', result.text);
          // You can handle the extracted text here
        } else {
          // Handle case where only description is provided
          const response = await fetch('/api/createChapter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, name: paragraphName }),
          });

          const result = await response.json();

          if (response.ok) {
            console.log(result);
            setSuccess(true);
            setError(null);
            //setSelectedChat(result.slide);
            setSelectedSlides(result.slide)
            const encodedSlideId = encodeURIComponent(result.slide.slideId);
            router.push(`/my-tutor/${encodedSlideId}`);
          } else {
            setError(result.error);
          }
        }
      } catch (error) {
        console.error('Error uploading slide:', error);
        setError('Failed to upload slide. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const setSelectedSlides = (slide: any) => {
    setSelectedChat((prev: any) => slide)
  }

  return (
    <div className="p-0 flex justify-center items-center">
      <div className="p-5 bg-[var(--dialogue-primary)] rounded max-w-[600px]">
        <div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-primary">New Chat</h3>
            </div>
            <p className="text-[12px] mt-2 text-primary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dicta repudiandae officiis sapiente hic minus voluptatem quia minima distinctio.
            </p>
          </div>

          {error && <small className='text-red-500 text-[10px] my-1 inline-block'>{error}</small>}
          {success && <small className='text-green-500 text-[10px] my-1 inline-block'>Slide uploaded successfully!</small>}

          <div className="h-[] my-3 grid gap-2">
            <SlidesDropzone
              className="border hover:bg-hoverPrimary cursor-pointer text-primary border- border-dashed border-primary rounded p-5 text-center"
              onDrop={handleFileDrop}
              clearError={clearError}
            />

            <div className="relative text-center">
              <hr className="absolute top-[50%] w-full translate-y-[50%] left-0 z-10" />
              <p className="px-3 text-[12px] bg-secondary z-20 inline-block relative text-primary">
                OR
              </p>
            </div>

            <SlidesDescription
              onChange={handleDescriptionChange}
              clearError={clearError}
              onNameChange={handleNameChange}
              name={paragraphName}
            />
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
              className={`bg-primary text-secondary px-4 py-2 font-medium rounded-[4px] text-[12px] ${loading && 'cursor-not-allowed'}`}
              onClick={handleUploadClick}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload slides'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTutor;
