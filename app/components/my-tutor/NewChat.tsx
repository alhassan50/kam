'use client'

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SlidesDropzone from '@/app/components/my-tutor/SlidesDropzone';
import SlidesDescription from '@/app/components/my-tutor/SlidesDescription';

// Utility function to remove file extension
const removeFileExtension = (fileName: string): string => {
  return fileName.replace(/\.[^/.]+$/, "");
};

function NewChat() {
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

  const uploadFile = async (file: File) => {
    setStatus('Extracting...');
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/extractText', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response.data;

      // Create chapter with extracted text
      const fileNameWithoutExtension = removeFileExtension(file.name);
      await createChapter(result.text, fileNameWithoutExtension);
    } catch (error) {
      setStatus(null);
      console.error('Error extracting text:', error);
      setError('Failed to extract text. Please try again.');
    }
  };

  const createChapter = async (description: string, name: string) => {
    setStatus('Uploading...');
    try {
      const response = await axios.post('/api/createChapter', {
        description,
        name,
      });

      const result = response.data;

      if (response.status !== 200) {
        setError(result.error);
        setStatus(null);
        return;
      }

      console.log(result);
      setSuccess(true);
      setError(null);
      setStatus('Redirecting...');
      const encodedSlideId = encodeURIComponent(result.slide.slideId);
      router.push(`/my-tutor/${encodedSlideId}`);
    } catch (error) {
      setStatus(null);
      console.error('Error creating chapter:', error);
      setError('Failed to create chapter. Please try again.');
    }
  };

  const handleUploadClick = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (file && (description || paragraphName)) {
      setError('Please upload either a file or input slides description, not both.');
      setLoading(false);
    } else if (!file && !description) {
      setError('Please provide either a file or slides description.');
      setLoading(false);
    } else {
      if (file) {
        await uploadFile(file);
      } else {
        await createChapter(description, paragraphName);
      }
      setLoading(false);
    }
  };

  return (
    <div className='overflow-y-auto h-full py-10'>
      <div className="p-0 flex justify-center items-center ">
        <div className="sm:p-5 sm:bg-[var(--dialogue-primary)] sm:rounded max-w-[600px]">
          <div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-primary">New Chat</h3>
              </div>
              <p className="text-[12px] mt-2 text-primary">
                Engage in a new conversation or continue where you left off. Share your thoughts, ideas, or questions, and let&apos;s explore together. Upload a presentation slide, or simply type your message to get started.
              </p>
            </div>

            {error && <small className='text-red-500 text-[10px] my-1 inline-block'>{error}</small>}
            {success && <small className='text-green-500 text-[10px] my-1 inline-block'>Slide uploaded successfully!</small>}

            <div className="h-[] my-3 grid gap-2">
              <SlidesDropzone
                className="border hover:bg-hoverPrimary cursor-pointer text-primary border-dashed border-primary rounded p-5 text-center"
                onDrop={handleFileDrop}
                clearError={clearError}
              />

              <div className="relative text-center">
                <hr className="absolute top-[50%] w-full translate-y-[50%] left-0 z-10" />
                <p className="px-3 text-[12px] bg-[var(--primsec)] z-20 inline-block relative text-primary">
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
                className={`bg-primary text-secondary px-4 py-2 font-medium rounded-[4px] text-[12px] ${loading && 'cursor-not-allowed'}`}
                onClick={handleUploadClick}
                disabled={loading}
              >
                {status || 'Upload slides'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewChat;
